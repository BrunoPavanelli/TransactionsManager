import { TTransactionCreateInDb, TTransactionResponse, TTrasactionUpdate } from "../interfaces/transactions.interfaces";

export abstract class TransactionsRepositories {
    abstract create(transactionData: TTransactionCreateInDb): Promise<TTransactionResponse>
    abstract findAll(): Promise<TTransactionResponse[]>
    abstract findByCpfUser(userId: number): Promise<TTransactionResponse[]>
    abstract updateById(trasactionId: number, transactionData: TTrasactionUpdate): Promise<TTransactionResponse>
    abstract deleteById(trasactionId: number): Promise<void>
}

export abstract class TransactionsAbstractMiddlewares {
    abstract findById(trasactionId: number): Promise<TTransactionResponse>
}