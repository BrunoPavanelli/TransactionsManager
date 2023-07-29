import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

import { IAdminITransactionsContext, ITransaction } from "./@transactionsTypes";
import { IChildren } from "../../@types/@globalTypes";
import { api } from "../../service/api";
import { UsersContext } from "../UsersContext/UsersContext";

export const AdminTransactionsContext = createContext<IAdminITransactionsContext>({} as IAdminITransactionsContext);

export const AdminTransactionsProvider = ({children}: IChildren) => {
    const { userLogout } = useContext(UsersContext);

    const [allTransactions, setAllTransactions] = useState<ITransaction[]>([]);
    // const [filteredTransactions, setFilteredTransactions] = useState<ITransaction[]>([]);

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
        <AdminTransactionsContext.Provider value={{
                allTransactions,
                setAllTransactions,
                retrieveAllTransactions,
                uploadFile
            }}>
            {children}
        </AdminTransactionsContext.Provider>
    );
};