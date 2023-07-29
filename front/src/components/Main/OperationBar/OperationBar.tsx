import { useContext, useEffect } from "react";
import { FaWallet } from "react-icons/fa";

import { OperationBarDivStyled, OperationBarStyled } from "./OperationBarStyled";
import { SelectStyled } from "./Filters/SelectStyled";
import { UsersContext } from "../../../contexts/UsersContext/UsersContext";
import { AiOutlineSearch } from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUserSearchData } from "../../../contexts/TransactionsContext/@transactionsTypes";
import { TransactionsContext } from "../../../contexts/TransactionsContext/TransactionsContext";
import { SubtotalModal } from "../../SubtotalModal/SubtotalModal";


export const OperationBar = () => {
    const { retrieveUserData, user } = useContext(UsersContext);
    const { filterTransactions, openModal, setOpenModal } = useContext(TransactionsContext);

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
                <h2 className="black__text0 fw__400 fs__25 letterspace__header desktop">Welcome<span className="blue__white__text"> {user?.username}!</span></h2>
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
                    <button className="bar__btn" onClick={() => setOpenModal(true)}>
					    <FaWallet size={30} />
                    </button>
                    {openModal ? <SubtotalModal/> : null}
				</form>
            </OperationBarDivStyled>
        </OperationBarStyled>
    );
};