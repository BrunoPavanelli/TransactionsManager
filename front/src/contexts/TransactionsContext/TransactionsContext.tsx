import { createContext, useState } from "react";
import { toast } from "react-toastify";

import { ITransaction, IUserContext, IUserSearchData } from "./@transactionsTypes";
import { IChildren } from "../../@types/@globalTypes";
import { api } from "../../service/api";

export const TransactionsContext = createContext<IUserContext>({} as IUserContext);

export const TransactionsProvider = ({children}: IChildren) => {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<ITransaction[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const retrieveUserTransactions = async () => {
        const token = localStorage.getItem("@TransactionsM:Token");
        try {
            const { data } = await api.get<ITransaction[]>("/transactions/token", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }); 
            setTransactions(data);

        } catch (error) {
            toast.error("Some Error in Transactions req");
            console.log(error);
        }
    };

    const convertTransactionData = (transaction: ITransaction) => {
        let date = new Date(transaction.date).toUTCString();
        const [, day, monthString, year] = date.split(" ");
        // eslint-disable-next-line no-sparse-arrays
        date = [, day, monthString, year].join(" ");

        const value= `$ ${(Number(transaction.value) / 100).toLocaleString()},00`;
        
        return {
            ...transaction,
            date: date,
            value: value
        };

    };

    const filterTransactionsByDate = async (dateRange: string): Promise<ITransaction[] | void> => {
        const token = localStorage.getItem("@TransactionsM:Token");
        const dateRangeObject = {
            dateRange: dateRange
        };

        if (dateRange === "Date") {
            setFilteredTransactions([]);
            return;
        }

        try {
            const { data } = await api.post<ITransaction[]>("/transactions/token/date_range", dateRangeObject, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }); 

            return data;
        } catch (error) {
            toast.error("Some Error in Transactions Filter By Date req");
            console.log(error);
        }        
    };

    const filterTransactions = async (searchData: IUserSearchData): Promise<void>=> {
        if (searchData.status === "Status") {
            const filteredTransactions = await filterTransactionsByDate(searchData.date);
            filteredTransactions ? setFilteredTransactions(filteredTransactions) : setFilteredTransactions([]);
            return;
        }

        if (searchData.date === "Date") {
            filterTransactionsByStatus(searchData.status, transactions);
            return;
        }

        const filteredTransactions = await filterTransactionsByDate(searchData.date);
        filterTransactionsByStatus(searchData.status, filteredTransactions!);
        return;
    };

    const filterTransactionsByStatus = (status: string, transactionsList: ITransaction[]): void => {
        const filteredTransactions = transactionsList.filter(transaction => transaction.status === status);

        if (filteredTransactions.length === 0) {
            toast.warning("Any Transactions for that search!");
        }
        
        setFilteredTransactions(filteredTransactions);
    };

    return (
        <TransactionsContext.Provider value={{
                transactions,
                setTransactions,
                retrieveUserTransactions,
                convertTransactionData,
                filteredTransactions,
                filterTransactions,
                openModal,
                setOpenModal
            }}>
            {children}
        </TransactionsContext.Provider>
    );
};