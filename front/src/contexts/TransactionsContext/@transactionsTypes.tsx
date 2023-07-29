export interface IUserContext {
    retrieveUserTransactions: () => Promise<void>,
    retrieveAllTransactions: () => Promise<void>,
    transactions: ITransaction[],
    setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>
    allTransactions: ITransaction[],
    setAllTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>
    convertTransactionData: (transaction: ITransaction) => ITransaction,
    filteredTransactions: ITransaction[],
    filterTransactions: (searchData: IUserSearchData) => Promise<void>,
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    approvedTransactionsSubtotal: ISubtotal | null,
    retrieveSubtotalUserApprovedTransactions: () => Promise<void>
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

export interface IUserSearchData {
    date: string,
    status: string
}

export interface ISubtotal {
    subtotal: string
}