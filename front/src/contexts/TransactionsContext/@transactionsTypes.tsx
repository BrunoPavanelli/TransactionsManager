export interface IUserContext {
    retrieveUserTransactions: () => Promise<void>,
    transactions: ITransaction[] | null,
    setTransactions: React.Dispatch<React.SetStateAction<ITransaction[] | null>>
    convertTransactionData: (transaction: ITransaction) => ITransaction,
}

export interface IUser {
    id: string,
    email: string,
    username: string,
    role: string,
}

export interface ILoginData {
    email: string,
    password: string
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
