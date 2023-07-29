import { useContext, useEffect } from "react";

import { OperationBarDivStyled, OperationBarStyled } from "./OperationBarStyled";
import { SelectStyled } from "./Select/SelectStyled";
import { UsersContext } from "../../../contexts/UsersContext/UsersContext";
import { AiOutlineSearch } from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUserSearchData } from "../../../contexts/TransactionsContext/@transactionsTypes";
import { TransactionsContext } from "../../../contexts/TransactionsContext/TransactionsContext";

export const AdminOperationBar = () => {
    const { retrieveUserData } = useContext(UsersContext);
    const { filterTransactions} = useContext(TransactionsContext);

    const {handleSubmit, register} = useForm<IUserSearchData>();

    const submit: SubmitHandler<IUserSearchData> = (data) => {
        filterTransactions(data);
    };

    useEffect(() => {
        retrieveUserData();
    }, []);
    
    return (
        <OperationBarStyled>
            <OperationBarDivStyled className="container__page">
                <h2 className="black__text0 fw__400 fs__25 letterspace__header desktop"><span className="blue__white__text">Admin</span> Dashboard</h2>
                <form className="navbar" onSubmit={handleSubmit(submit)}>
                    <SelectStyled {...register("date")}>
                        <option value="Date">Date</option>
                        <option value="30 days">1 Month</option>
                        <option value="90 days">3 Months</option>
                        <option value="180 days">6 Months</option>
                        <option value="1 year">1 Year</option>
                        <option value="2 years">2 Years</option>
                        <option value="5 years">5 Years</option>
                    </SelectStyled>

                    <SelectStyled {...register("status")} >
                        <option value="Status">Status</option>
                        <option value="In Analysis">In Analysis</option>
                        <option value="Approved">Approved</option>
                        <option value="Reproved">Reproved</option>
                    </SelectStyled>
                    <button className="bar__btn">
                        <AiOutlineSearch size={30} />
                    </button>
				</form>
            </OperationBarDivStyled>
        </OperationBarStyled>
    );
};