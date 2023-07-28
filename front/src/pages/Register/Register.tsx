import { useContext } from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import { PiPasswordBold } from "react-icons/pi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { HiIdentification } from "react-icons/hi";

import { RegisterStyled } from "./RegisterStyled";
import { Header } from "../../components/Header/Header";
import { Main } from "../../components/Main/Main";
import { Input } from "../../components/Form/LoginRegisterDiv/Input/Input";
import { ButtonStyled } from "../../components/Form/LoginRegisterDiv/Button/ButtonStyled";
import { LoginRegisterFormStyled } from "../../components/Form/LoginRegisterDiv/LoginRegisterForm/LoginRegisterFormStyled";
import { IRegisterData } from "../../contexts/UsersContext/@usersTypes";
import { UsersContext } from "../../contexts/UsersContext/UsersContext";

export const Register = () => {
    const { userRegister } = useContext(UsersContext);

    const {register, handleSubmit} = useForm<IRegisterData>();

    const submit: SubmitHandler<IRegisterData> = async (data) => {
        userRegister(data);
    };

    return (
        <RegisterStyled>
            <Header />
            <Main>
                <LoginRegisterFormStyled onSubmit={handleSubmit(submit)}>
                    <Input placeholder="username: John Doe" type="text" register={register("username")}>
                        <MdDriveFileRenameOutline size={30} />
                    </Input>
                    <Input placeholder="document: 123.456.78-00" type="text" register={register("cpf")}>
                        <HiIdentification size={30} />
                    </Input>
                    <Input placeholder="email: user@mail.com" type="email" register={register("email")}>
                        <AiOutlineUser size={30} />
                    </Input>
                    <Input placeholder="password: ******" type="password" register={register("password")}>
                        <PiPasswordBold size={30} />
                    </Input>
                    <ButtonStyled type="submit">
                        Register
                    </ButtonStyled>
                    <h2 className="black__text2">
                        Already a member?{" "}
                        <Link className="white__text" to="/">
                            Login
                        </Link>
                    </h2>
                </LoginRegisterFormStyled>
            </Main>
        </RegisterStyled>
    );
};
