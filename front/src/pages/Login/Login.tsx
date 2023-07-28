
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import { PiPasswordBold } from "react-icons/pi";

import { LoginStyled } from "./LoginStyled";
import { Header } from "../../components/Header/Header";
import { Main } from "../../components/Main/Main";
import { Input } from "../../components/Form/LoginRegisterDiv/Input/Input";
import { ButtonStyled } from "../../components/Form/LoginRegisterDiv/Button/ButtonStyled";
import { LoginRegisterDiv } from "../../components/Form/LoginRegisterDiv/LoginRegisterDiv";
import { ILoginData } from "../../contexts/UsersContext/@usersTypes";
import { useContext } from "react";
import { UsersContext } from "../../contexts/UsersContext/UsersContext";
import { LoginRegisterFormStyled } from "../../components/Form/LoginRegisterDiv/LoginRegisterForm/LoginRegisterFormStyled";


export const Login = () => {
    const { userLogin } = useContext(UsersContext);

    const {register, handleSubmit} = useForm<ILoginData>();

    const submit: SubmitHandler<ILoginData> = async (data) => {
        userLogin(data);
    };

    return (
        <LoginStyled>
            <Header/>
            <Main>
                <LoginRegisterDiv>
                    <LoginRegisterFormStyled onSubmit={handleSubmit(submit)}>
                            <Input placeholder="email: user@mail.com" register={register("email")} type={"email"}>
                                <AiOutlineUser size={30}/>
                            </Input>
                            <Input placeholder="password: ******" register={register("password")} type={"password"}>
                                <PiPasswordBold size={30}/>
                            </Input>
                            <ButtonStyled type="submit">Login</ButtonStyled>
                            <h2 className="black__text2">Not a member? <Link className="white__text" to="/register">Sign up now</Link></h2>
                    </LoginRegisterFormStyled>
                </LoginRegisterDiv>
            </Main>
        </LoginStyled>
    );
};