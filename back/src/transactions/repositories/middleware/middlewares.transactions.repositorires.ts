import database from "../../../database/database"
import { TTransactionResponse } from "../../interfaces/transactions.interfaces"
import { TransactionsAbstractMiddlewares } from "../transactions.repositories"

export class TransactionsMiddlewaresRepositories implements TransactionsAbstractMiddlewares {
    async findById(transactionId: number): Promise<TTransactionResponse> {
        const transactionFind: TTransactionResponse = await database.select("*").from("transactions").where({
            id: transactionId
        }).first()
        
        return transactionFind
    }
}