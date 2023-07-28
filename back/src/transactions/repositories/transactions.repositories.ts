import {
	TDateRange,
	TTransactionCreateInDb,
	TTransactionResponse,
	TTrasactionUpdate,
	TValueRange,
} from "../interfaces/transactions.interfaces";

export abstract class TransactionsRepositories {
    abstract create(
        transactionData: TTransactionCreateInDb
    ): Promise<TTransactionResponse>;
    abstract findAll(): Promise<TTransactionResponse[]>;
    abstract findByCpfUser(userId: number): Promise<TTransactionResponse[]>;
    abstract findByStatus(status: string): Promise<TTransactionResponse[]>;
    abstract findByProduct(product: string): Promise<TTransactionResponse[]>;
    abstract findByDateRange(dateRange: TDateRange): Promise<TTransactionResponse[]>;
    abstract findByValueRange(valueRange: TValueRange): Promise<TTransactionResponse[]>;
    abstract updateById(
        trasactionId: number,
        transactionData: TTrasactionUpdate
    ): Promise<TTransactionResponse>;
    abstract deleteById(trasactionId: number): Promise<void>;
}

export abstract class TransactionsAbstractMiddlewares {
    abstract findById(trasactionId: number): Promise<TTransactionResponse>;
}
