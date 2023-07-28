import database from "../../../database/database";
import {
	TDateRange,
	TTransactionCreateInDb,
	TTransactionResponse,
	TTrasactionUpdate,
	TValueRange,
} from "../../interfaces/transactions.interfaces";
import { TransactionsRepositories } from "../transactions.repositories";

export class KnexTransactionRepositories implements TransactionsRepositories {

	async create(
		transactionData: TTransactionCreateInDb
	): Promise<TTransactionResponse> {
		const newTransaction = await database("transactions").insert({
			...transactionData,
		});

		const transactionResponse: TTransactionResponse = await database(
			"transactions"
		)
			.where({
				date: transactionData.date,
			})
			.select("*")
			.first();

		return transactionResponse;
	}

	async findAll(): Promise<TTransactionResponse[]> {
		const transactions: TTransactionResponse[] = await database
			.select("*")
			.from("transactions");

		return transactions;
	}

	async findByCpfUser(userId: string): Promise<TTransactionResponse[]> {
		const transactions: TTransactionResponse[] = await database
			.select("*")
			.from("transactions")
			.where({
				user_id: userId,
			});

		return transactions;
	}

	async findByStatus(status: string): Promise<TTransactionResponse[]> {
		const transactions: TTransactionResponse[] = await database
			.select("*")
			.from("transactions")
			.where({
				status: status
			});

		return transactions;
	}

	async findByProduct(product: string): Promise<TTransactionResponse[]> {
		const transactions: TTransactionResponse[] = await database
			.select("*")
			.from("transactions")
			.whereILike(
				"description", `%${product}%`
			);

		return transactions;
	}

	async findByDateRange(dateRange: TDateRange): Promise<TTransactionResponse[]> {
		const transactions: TTransactionResponse[] = await database
			.select("*")
			.from("transactions")
			.whereBetween(
				"date", [dateRange.minDate, dateRange.maxDate]
			);

		return transactions;
	}

	async findByValueRange(valueRange: TValueRange): Promise<TTransactionResponse[]> {
		const transactions: TTransactionResponse[] = await database
			.select("*")
			.from("transactions")
			.whereBetween(
				"value", [valueRange.minValue, valueRange.maxValue]
			);

		return transactions;
	}

	async findByTokenAndDateRange(dateRange: TDateRange, userId: string): Promise<TTransactionResponse[]> {
		const transactions: TTransactionResponse[] = await database
			.select("*")
			.from("transactions")
			.whereBetween(
				"date", [dateRange.minDate, dateRange.maxDate]
			)
			.andWhere({
				user_id: userId
			});

		return transactions;
	}

	async updateById(
		trasactionId: string,
		newTransactionData: TTrasactionUpdate
	): Promise<TTransactionResponse> {
		await database("transactions")
			.where({ id: trasactionId })
			.first()
			.update({
				...newTransactionData,
			});

		const transactionUpdated: TTransactionResponse = await database(
			"transactions"
		)
			.first()
			.where({
				id: trasactionId,
			})
			.select("*");

		return transactionUpdated;
	}

	async deleteById(trasactionId: string): Promise<void> {
		await database("transactions")
			.where({ id: trasactionId })
			.first()
			.delete();

		return;
	}
}

export const transactionsRepositories = new KnexTransactionRepositories();
