
import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import { PiPasswordBold } from "react-icons/pi";

import { useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginStyled } from "./LoginStyled";
import { Header } from "../../components/Header/Header";
import { Main } from "../../components/Main/Main";
import { Input } from "../../components/Form/LoginRegisterDiv/Input/Input";
import { ButtonStyled } from "../../components/Form/LoginRegisterDiv/Button/ButtonStyled";
import { ILoginData } from "../../contexts/UsersContext/@usersTypes";
import { UsersContext } from "../../contexts/UsersContext/UsersContext";
import { LoginRegisterFormStyled } from "../../components/Form/LoginRegisterDiv/LoginRegisterForm/LoginRegisterFormStyled";
import { loginSchema } from "./validator";


export const Login = () => {
    const { userLogin } = useContext(UsersContext);

    const {register, handleSubmit, formState: { errors }} = useForm<ILoginData>({
        resolver: zodResolver(loginSchema)
    });

    const submit: SubmitHandler<ILoginData> = async (data) => {
        userLogin(data);
    };

    return (
        <LoginStyled>
            <Header/>
            <Main>
                <LoginRegisterFormStyled onSubmit={handleSubmit(submit)}>
                        <Input placeholder="email: user@mail.com" register={register("email")} type={"email"} errors={errors.email?.message}>
                            <AiOutlineUser size={30}/>
                        </Input>
                        <Input placeholder="password: ******" register={register("password")} type={"password"} errors={errors.password?.message}>
                            <PiPasswordBold size={30}/>
                        </Input>
                        <ButtonStyled type="submit">Login</ButtonStyled>
                        <h2 className="black__text2">Not a member? <Link className="white__text" to="/register">Sign up now</Link></h2>
                </LoginRegisterFormStyled>
            </Main>
        </LoginStyled>
    );
};