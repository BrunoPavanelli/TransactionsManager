import { useContext, useEffect } from "react";
import { FaWallet } from "react-icons/fa";

import { OperationBarDivStyled, OperationBarStyled } from "./OperationBarStyled";
import { SelectStyled } from "./Select/SelectStyled";
import { UsersContext } from "../../../contexts/UsersContext/UsersContext";
import { TransactionsContext } from "../../../contexts/TransactionsContext/TransactionsContext";


export const OperationBar = () => {
    const { retrieveUserData, user } = useContext(UsersContext);
    const { filterTransactionsByStatus } = useContext(TransactionsContext);

    useEffect(() => {
        retrieveUserData();
    }, []);
    
    return (
        <OperationBarStyled>
            <OperationBarDivStyled className="container__page">
                <h2 className="black__text0 fw__400 fs__25 letterspace__header desktop">Welcome<span className="blue__white__text"> {user?.username}!</span></h2>
                <div className="navbar">
                    <SelectStyled onChange={(e) => {
                        console.log(e.target.value);
                        filterTransactionsByStatus(e.target.value);
                        }}>
                        <option value="Status">Date</option>
                        <option value="In Analysis">1 Month</option>
                        <option value="Approved">3 Months</option>
                        <option value="Reproved">6 Months</option>
                        <option value="In Analysis">1 Year</option>
                        <option value="Approved">2 Years</option>
                        <option value="Reproved">5 Years</option>
                    </SelectStyled>
                    <SelectStyled onChange={(e) => {
                        console.log(e.target.value);
                        filterTransactionsByStatus(e.target.value);
                        }}>
                        <option value="Status">Status</option>
                        <option value="In Analysis">In Analysis</option>
                        <option value="Approved">Approved</option>
                        <option value="Reproved">Reproved</option>
                    </SelectStyled>
					<FaWallet size={30} className="wallet"/>
				</div>
            </OperationBarDivStyled>
        </OperationBarStyled>
    );
};