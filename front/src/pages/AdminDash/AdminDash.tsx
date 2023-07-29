import { useContext, useEffect } from "react";
import { CiLogout } from "react-icons/ci";

import { Header } from "../../components/Header/Header";
import { AdminDashStyled } from "./AdminDashStyled";
import { UsersContext } from "../../contexts/UsersContext/UsersContext";
import { TransactionsSection } from "../../components/Main/TransactionsSection/TransactionsSection";
import { AdminOperationBar } from "../../components/Main/OperationBar/AdminOperationBar";
import { AdminTransactionsDiv } from "../../components/Main/TransactionsSection/TransactionsDiv/AdminTransactionsDiv";
import { AdminTransactionsContext } from "../../contexts/TransactionsContext/AdminTransacitionsContext";

export const AdminDash = () => {
    const { userLogout, retrieveUserData } = useContext(UsersContext);
    const { retrieveAllTransactions } = useContext(AdminTransactionsContext);

    useEffect(() => {
        retrieveUserData();
        retrieveAllTransactions();
    }, []);

    return (
        <AdminDashStyled>
            <Header children={<CiLogout className="logout" size={32} onClick={userLogout}/>}/>
            <AdminOperationBar/>
            <TransactionsSection children={<AdminTransactionsDiv />}/>
        </AdminDashStyled>
    );
};