/* eslint-disable no-case-declarations */
import fs from "node:fs";
import { parse as csvParse } from "csv-parse";

import { AppError } from "../../shared/handlerErrors.middleware";
import { UsersRepositories } from "../../users/repositories/users.repositories";
import { usersRepositories } from "../../users/repositories/knex/knex.users.repositories";
import { TransactionsRepositories } from "../repositories/transactions.repositories";
import { transactionsRepositories } from "../repositories/knex/knex.transactions.repositories";
import {
	TDateRange,
	TNoProducts,
	TSpreadSheetData,
	TTransactionCreateInDb,
	TTransactionRequest,
	TTransactionResponse,
	TTrasactionUpdate,
	TValueRange,
} from "../interfaces/transactions.interfaces";

export class TransactionsServices {
	constructor(
        private transactionsRepositories: TransactionsRepositories,
        private usersRepositories: UsersRepositories
	) {}

	private loadCsvFile(file: Express.Multer.File) {
		return new Promise<TSpreadSheetData[]>((resolve, reject) => {
			const stream = fs.createReadStream(file.path);
			const datas: TSpreadSheetData[] = [];
			const parseFile = csvParse();

			stream.pipe(parseFile);

			parseFile
				.on("data", async (line) => {
					// eslint-disable-next-line prefer-const
					let [cpf, description, date, points_value, value, status] =
                        line;

					date = new Date(date).getTime();

					value = value.split(".").join("").split(",").join("");
					points_value = value
						.split(".")
						.join("")
						.split(",")
						.join("");

					switch (status) {
					case "Aprovado":
						status = "Approved";
						break;
					case "Reprovado":
						status = "Reproved";
						break;
					case "Em avaliação":
						status = "In Analysis";
						break;
					default:
						status = "Invalid data";
					}

					datas.push({
						cpf,
						description,
						date,
						points_value,
						value,
						status,
					});
				})
				.on("end", () => {
					fs.promises.unlink(file.path);
					resolve(datas);
				})
				.on("error", (error) => {
					reject(error);
				});
		});
	}

	async importFile(file: Express.Multer.File) {
		const datas = await this.loadCsvFile(file);

		const toCheck = {
			cpf: "CPF",
			description: "Descrição da transação",
			date: NaN,
			points_value: "Valor",
			value: "Valor",
			status: "Invalid data",
		};
		if (JSON.stringify(datas[0]) !== JSON.stringify(toCheck))
			throw new AppError("Invalid File", 400);
		datas.splice(0, 1);

		const unregisteredUsers = [];
		const registeredUsers = [];
		for (const data of datas) {
			try {
				const userFind = await this.usersRepositories.findByCpf(
					data.cpf
				);
				registeredUsers.push(data.cpf);

				const newData: TTransactionCreateInDb = {
					description: data.description,
					date: data.date,
					points_value: parseInt(data.points_value),
					value: parseInt(data.value) * 100,
					status: data.status,
					user_id: userFind.id,
				};

				// const newDataParsed =
				//     schemas.transactionsWithOutId.safeParse(newData);
				// if (!newDataParsed.success)
				// 	throw new AppError("Invalid File", 400);

				await this.transactionsRepositories.create({
					...newData,
				});
			} catch(err) {
				console.log(err);
				unregisteredUsers.push(data.cpf);
			}
		}

		if (registeredUsers.length > 0 && unregisteredUsers.length === 0) {
			return {
				message: "Data inserted in DB with succes!",
			};
		} else if (
			registeredUsers.length === 0 &&
            unregisteredUsers.length > 0
		) {
			return {
				error: {
					message: "Data not inserted in DB for unregistered CPF's",
				},
			};
		} else if (registeredUsers.length > 0 && unregisteredUsers.length > 0) {
			return {
				sucess: {
					message: "Data inserted in DB with succes for CPF's:",
					cpfs: registeredUsers,
				},
				error: {
					message: "Data not inserted in DB for unregistered CPF's:",
					cpfs: unregisteredUsers,
				},
			};
		}
	}

	async create(
		transactionData: TTransactionRequest
	): Promise<TTransactionResponse> {
		const userFind = await this.usersRepositories.findByCpf(transactionData.cpf);

		const transactionCreateInDb: TTransactionCreateInDb = {
			description: transactionData.description,
			date: transactionData.date,
			points_value: transactionData.points_value,
			value: transactionData.value * 100,
			status: transactionData.status,
			user_id: userFind.id,			
		};

		return await this.transactionsRepositories.create(transactionCreateInDb);
	}

	async findAll(): Promise<TTransactionResponse[]> {
		return await this.transactionsRepositories.findAll();
	}

	async findByCpfUser(userCpf: string): Promise<TTransactionResponse[]> {
		const userFind = await this.usersRepositories.findByCpf(userCpf);

		return await this.transactionsRepositories.findByCpfUser(userFind.id);
	}

	async findByStatus(status:string): Promise<TTransactionResponse[]> {
		return await this.transactionsRepositories.findByStatus(status);
	}

	async findByProduct(product: string): Promise<TTransactionResponse[] | TNoProducts> {
		const transactions = await this.transactionsRepositories.findByProduct(product);

		if (transactions.length === 0) {
			return {
				message: "There is no transactions for this product."
			};
		}

		return transactions;
	}

	private createMinAndMaxDate(dateRange: string): TDateRange {
		const maxDate: number = new Date().getTime();
		const oneDay: number = 1000 * 3600 * 24;
		let minDate: number = 0;

		switch (dateRange) {
		case "30 days":
			minDate = maxDate - (oneDay * 30);
			break;
		case "90 days":
			minDate = maxDate - (oneDay * 90);
			break;
		case "180 days":
			minDate = maxDate - (oneDay * 180);
			break;
		case "1 year":
			minDate = maxDate - (oneDay * 365);
			break;
		case "2 years":
			minDate = maxDate - (oneDay * 365 * 2);
			break;
		case "5 years":
			minDate = maxDate - (oneDay * 365 * 5);
			break;
		}

		return {
			maxDate,
			minDate
		};

	}

	async findByDateRange(dateRange: string): Promise<TTransactionResponse[]> {
		const dateRangeInTime = this.createMinAndMaxDate(dateRange);

		return await this.transactionsRepositories.findByDateRange(dateRangeInTime);
	}

	async findByValueRange(valueRange: TValueRange): Promise<TTransactionResponse[]> {
		return await this.transactionsRepositories.findByValueRange(valueRange);
	}

	async updateById(
		transactionId: string,
		newTransactionData: TTrasactionUpdate
	): Promise<TTransactionResponse> {
		return await this.transactionsRepositories.updateById(
			transactionId,
			newTransactionData
		);
	}

	async deleteById(transactionId: string): Promise<void> {
		return await this.transactionsRepositories.deleteById(transactionId);
	}
}

export const transactionsServices = new TransactionsServices(
	transactionsRepositories,
	usersRepositories
);
