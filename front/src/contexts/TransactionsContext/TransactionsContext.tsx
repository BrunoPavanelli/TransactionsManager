import { createContext, useState } from "react";
import { toast } from "react-toastify";

import { ITransaction, IUserContext } from "./@transactionsTypes";
import { IChildren } from "../../@types/@globalTypes";
import { api } from "../../service/api";

export const TransactionsContext = createContext<IUserContext>({} as IUserContext);

export const TransactionsProvider = ({children}: IChildren) => {
    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<ITransaction[]>([]);

    const retrieveUserTransactions = async () => {
        const token = localStorage.getItem("@TransactionsM:Token");
        try {
            const { data } = await api.get("/transactions/token", {
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

    const filterTransactionsByStatus = (status: string): void => {
        const filteredTransactions = transactions!.filter(transaction => transaction.status === status);
        status === "Status" ? setFilteredTransactions(transactions) : setFilteredTransactions(filteredTransactions);
    };

    // const filterTransactionsByDate = async (dateRange: string): Promise<void> => {
    //     if (dateRange === "Date") {
    //         setTransactions(transactions);
    //         return;
    //     }

    //     const token = localStorage.getItem("@TransactionsM:Token");
    //     try {
    //         const { data } = await api.get("transactions/date_range", {
    //             data: {
    //                 dateRange: dateRange
    //             },
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         }); 
    //         setTransactions(data);

    //     } catch (error) {
    //         toast.error("Some Error in Transactions Filter By Date req");
    //         console.log(error);
    //     }        
    // };

    return (
        <TransactionsContext.Provider value={{
                transactions,
                setTransactions,
                retrieveUserTransactions,
                convertTransactionData,
                filteredTransactions,
                filterTransactionsByStatus
            }}>
            {children}
        </TransactionsContext.Provider>
    );
};