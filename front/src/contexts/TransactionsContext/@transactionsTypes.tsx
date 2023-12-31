export interface ITransactionsContext {
    retrieveUserTransactions: () => Promise<void>,
    transactions: ITransaction[],
    setTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>
    convertTransactionData: (transaction: ITransaction) => ITransaction,
    filteredTransactions: ITransaction[],
    filterTransactions: (searchData: IUserSearchData) => Promise<void>,
    openModal: boolean,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    approvedTransactionsSubtotal: ISubtotal | null,
    retrieveSubtotalUserApprovedTransactions: () => Promise<void>,
}

export interface IAdminITransactionsContext {
    retrieveAllTransactions: () => Promise<void>,
    allTransactions: ITransaction[],
    setAllTransactions: React.Dispatch<React.SetStateAction<ITransaction[]>>
    uploadFile: (file: File) => Promise<void>,
    filteredTransactions: ITransaction[],
    manipuleFilterData: (filterData: IFilterTransactions) => IFilterTransactions,
    filterTransactions: (filterData: IFilterTransactions) => Promise<void>
}

export interface ITransaction 	{
    id: string,
    description: string
    date: number | string,
    points_value: number,
    value: number | string,
    status: "In Analisys" | "Approved" | "Reproved",
    user_id: string
    cpf?: string
}

export interface IUserSearchData {
    date: string,
    status: string
}

export interface ISubtotal {
    subtotal: string
}

export interface IFilterTransactions {
    userCpf?: string | null, 
    product?: string | null, 
    dateRange?: string| null
    valueRange?: {
        minValue: number | null;
        maxValue: number | null;
    } | string
    status?: string | null
}