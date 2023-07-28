import { useContext, useEffect } from "react";
import { CiLogout } from "react-icons/ci";

import { Header } from "../../components/Header/Header";
import { UserDashStyled } from "./UserDashStyled";
import { UsersContext } from "../../contexts/UsersContext/UsersContext";
import { OperationBar } from "../../components/Main/OperationBar/OperationBar";
import { TransactionsSection } from "../../components/Main/TransactionsSection/TransactionsSection";
import { TransactionsContext } from "../../contexts/TransactionsContext/transactionsContext";

export const UserDash = () => {
    const { userLogout, retrieveUserData } = useContext(UsersContext);
    const { retrieveUserTransactions } = useContext(TransactionsContext);

    useEffect(() => {
        retrieveUserData();
        retrieveUserTransactions();
    }, []);

    return (
        <UserDashStyled>
            <Header children={<CiLogout className="logout" size={32} onClick={userLogout}/>}/>
            <OperationBar/>
            <TransactionsSection/>
        </UserDashStyled>
    );
};