import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

import { ISubtotal, ITransaction, IUserContext, IUserSearchData } from "./@transactionsTypes";
import { IChildren } from "../../@types/@globalTypes";
import { api } from "../../service/api";
import { UsersContext } from "../UsersContext/UsersContext";

export const TransactionsContext = createContext<IUserContext>({} as IUserContext);

export const TransactionsProvider = ({children}: IChildren) => {
    const { userLogout } = useContext(UsersContext);

    const [transactions, setTransactions] = useState<ITransaction[]>([]);
    const [allTransactions, setAllTransactions] = useState<ITransaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<ITransaction[]>([]);
    const [approvedTransactionsSubtotal, setApprovedTransactionsSubtotal] = useState<ISubtotal | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const retrieveAllTransactions = async () => {
        const token = localStorage.getItem("@TransactionsM:Token");
        try {
            const { data } = await api.get<ITransaction[]>("/transactions", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setAllTransactions(data);
        } catch (error) {
            toast.warning("Please, login again :)");
            console.log(error);
            userLogout();
        }
    };

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
            toast.warning("Please, login again :)");
            console.log(error);
            userLogout();
        }
    };

    const retrieveSubtotalUserApprovedTransactions = async () => {
        const token = localStorage.getItem("@TransactionsM:Token");
        try {
            let { data } = await api.get<ISubtotal>("transactions/token/subtotal", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const value: string = `$ ${Number(data.subtotal).toLocaleString()},00`; 
            data = {
                subtotal: value
            };

            setApprovedTransactionsSubtotal(data);

        } catch (error) {
            toast.warning("Please, login again :)");
            console.log(error);
            userLogout();
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

    const uploadFile = async (file: any) => {
        const token = localStorage.getItem("@TransactionsM:Token");
        const formData = new FormData();
        formData.append("file", file);
        try {
            await api.post("/transactions/upload", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                    "Content-Length": `${file.size}`
                }
            }); 
            toast.success("Succes! File Uploaded.");

            setTimeout(() => {
                window.location.reload();
            }, 2500);
        } catch (error) {
            console.log(error);
        }        
    };

    return (
        <TransactionsContext.Provider value={{
                transactions,
                setTransactions,
                allTransactions,
                setAllTransactions,
                retrieveUserTransactions,
                retrieveAllTransactions,
                convertTransactionData,
                filteredTransactions,
                filterTransactions,
                openModal,
                setOpenModal,
                approvedTransactionsSubtotal,
                retrieveSubtotalUserApprovedTransactions,
                uploadFile
            }}>
            {children}
        </TransactionsContext.Provider>
    );
};