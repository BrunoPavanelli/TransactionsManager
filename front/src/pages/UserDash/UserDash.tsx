import { useContext, useEffect } from "react";
import { CiLogout } from "react-icons/ci";

import { Header } from "../../components/Header/Header";
import { UserDashStyled } from "./UserDashStyled";
import { UsersContext } from "../../contexts/UsersContext/UsersContext";
import { OperationBar } from "../../components/Main/OperationBar/OperationBar";
import { TransactionsSection } from "../../components/Main/TransactionsSection/TransactionsSection";

export const UserDash = () => {
    const { userLogout, retrieveUserTransactions, retrieveUserData } = useContext(UsersContext);

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