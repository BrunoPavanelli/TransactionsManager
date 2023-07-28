export interface IUserContext {
    retrieveUserTransactions: () => Promise<void>,
    transactions: ITransaction[],
    setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>
    convertTransactionData: (transaction: ITransaction) => ITransaction,
    filteredTransactions: ITransaction[],
    filterTransactions: (status: string) => void
}

export interface ITransaction 	{
    id: string,
    description: string
    date: number | string,
    points_value: number,
    value: number | string,
    status: "In Analisys" | "Approved" | "Reproved",
    user_id: string
}