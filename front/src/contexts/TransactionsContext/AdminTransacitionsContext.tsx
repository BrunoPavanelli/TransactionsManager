import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

import { IAdminITransactionsContext, IFilterTransactions, ITransaction } from "./@transactionsTypes";
import { IChildren } from "../../@types/@globalTypes";
import { api } from "../../service/api";
import { UsersContext } from "../UsersContext/UsersContext";

export const AdminTransactionsContext = createContext<IAdminITransactionsContext>({} as IAdminITransactionsContext);

export const AdminTransactionsProvider = ({children}: IChildren) => {
    const { userLogout } = useContext(UsersContext);

    const [allTransactions, setAllTransactions] = useState<ITransaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<ITransaction[]>([]);

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
                    "Content-Type": "multipart/form-data"
                }
            }); 
            toast.success("Succes! File Uploaded.");

            setTimeout(() => {
                window.location.reload();
            }, 2500);
        } catch (error) {
            toast.error("Ooops, some error occurred! Only CSV's files are permitted!");
            console.log(error);
        }        
    };

    const manipuleFilterData = (filterData: IFilterTransactions): IFilterTransactions => {
        const rangeArray = [
            {
                range: 1,
                minValue: 0,
                maxValue: 1000000
            },
            {
                range: 2,
                minValue: 1000001,
                maxValue: 5000000
            },
            {
                range: 3,
                minValue: 5000001,
                maxValue: 25000000 
            },

            {
                range: 4,
                minValue: 25000001,
                maxValue: 100000000 
            }
        ];

        if (filterData.dateRange === "Date") delete filterData.dateRange;
        if (filterData.valueRange === "Value") delete filterData.valueRange;
        if (filterData.status === "Status") delete filterData.status;
        if (filterData.product === "") delete filterData.product;
        if (filterData.userCpf === "") delete filterData.userCpf;

        if (filterData.valueRange) {
            const newValueRange = rangeArray.map(item => {
                if (String(item.range) === filterData.valueRange) {
                    const newValueRange = {
                        minValue: item.minValue,
                        maxValue: item.maxValue,
                    };

                    return newValueRange;
                }
            }).find(valueRange => valueRange);

            filterData = {
                ...filterData,
                valueRange: newValueRange
            };
        }

        return filterData;
    };

    const filterTransactions = async (filterData: IFilterTransactions): Promise<void> => {
        const token = localStorage.getItem("@TransactionsM:Token");
        try {
            const { data } = await api.post<ITransaction[]>("transactions/filter", filterData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (data.length === allTransactions.length) {
                setFilteredTransactions([]);
                toast.success("All transactions retrieved!");     
                return;           
            }

            if (data.length === 0) {
                setFilteredTransactions([]);
                toast.warning("Any Transactions for that search!");
                return;
            }

            setFilteredTransactions(data);
            toast.success("Search with succes!");
        } catch (error) {
            toast.warning("Ooops, some error occurred! Try again.)");
            console.log(error);
        }
    };

    return (
        <AdminTransactionsContext.Provider value={{
                allTransactions,
                setAllTransactions,
                retrieveAllTransactions,
                uploadFile,
                filterTransactions,
                filteredTransactions,
                manipuleFilterData
            }}>
            {children}
        </AdminTransactionsContext.Provider>
    );
};