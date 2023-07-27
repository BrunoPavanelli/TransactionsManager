import database from "../../../database/database";
import {
	TTransactionCreateInDb,
	TTransactionResponse,
	TTrasactionUpdate,
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
				id: newTransaction[0],
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

	async findByCpfUser(userId: number): Promise<TTransactionResponse[]> {
		const transactions: TTransactionResponse[] = await database
			.select("*")
			.from("transactions")
			.where({
				user_id: userId,
			});

		return transactions;
	}

	async updateById(
		trasactionId: number,
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

	async deleteById(trasactionId: number): Promise<void> {
		await database("transactions")
			.where({ id: trasactionId })
			.first()
			.delete();

		return;
	}
}

export const transactionsRepositories = new KnexTransactionRepositories();
