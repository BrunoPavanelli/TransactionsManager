import { ChangeEvent, useContext, useEffect, useRef } from "react";
import { FiUpload } from "react-icons/fi";

import { OperationBarDivStyled, OperationBarStyled } from "./OperationBarStyled";
import { SelectStyled } from "./Filters/SelectStyled";
import { UsersContext } from "../../../contexts/UsersContext/UsersContext";
import { AiOutlineSearch } from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import { IFilterTransactions } from "../../../contexts/TransactionsContext/@transactionsTypes";
import { AdminTransactionsContext } from "../../../contexts/TransactionsContext/AdminTransacitionsContext";
import { InputStyled } from "./Filters/InputAdminStyled";

export const AdminOperationBar = () => {
    const { retrieveUserData } = useContext(UsersContext);
    const { uploadFile, filterTransactions, manipuleFilterData } = useContext(AdminTransactionsContext);

    const hiddenFileInput = useRef<HTMLInputElement>(null);
    const handleClick = () => {
        hiddenFileInput.current!.click();

    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const file: File = (e.target.files[0]);

        const formData = new FormData();
        formData.append("file", file);
        uploadFile(file);
      }
    };

    const {handleSubmit, register, reset} = useForm<IFilterTransactions>();

    const submit: SubmitHandler<IFilterTransactions> = (data) => {
        const filterData: IFilterTransactions = manipuleFilterData(data);
        filterTransactions(filterData);
        reset();
    };

    useEffect(() => {
        retrieveUserData();
    }, []);
    
    return (
        <OperationBarStyled>
            <OperationBarDivStyled className="container__page">
                <div className="admin">
                    <h2 className="black__text0 fw__400 fs__25 letterspace__header desktop"><span className="blue__white__text">Admin</span> Dashboard</h2>
                    <div className="file__upload" onClick={() => handleClick()}>
                        <input type="file" ref={hiddenFileInput} onChange={(e) => handleFileChange(e)}/>
                        <FiUpload size={30} className="upload" />
                        <p className="fs__10">Click box to upload</p>
                    </div>

                </div>
                <form className="navbar" onSubmit={handleSubmit(submit)}>
                    <SelectStyled {...register("dateRange")}>
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

                    <SelectStyled {...register("valueRange")} >
                        <option value="Value">Value</option>
                        <option value="1">0 - $10.000,00</option>
                        <option value="2">{"> $10.000,00 - $50.000,00"}</option>
                        <option value="3">{"> $50.000,00 - $250.000,00"}</option>
                        <option value="4">{"> $250.000,00 - $1.000.000,00"}</option>
                    </SelectStyled>

                    <InputStyled type="text" placeholder="product" {...register("product")}/>
                    <InputStyled type="text" placeholder="cpf" {...register("userCpf")}/>
                    <button className="bar__btn">
                        <AiOutlineSearch size={30} />
                    </button>
				</form>
            </OperationBarDivStyled>
        </OperationBarStyled>
    );
};