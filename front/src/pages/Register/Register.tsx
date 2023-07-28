import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { PiPasswordBold } from "react-icons/pi";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { HiIdentification } from "react-icons/hi";

import { RegisterStyled } from "./RegisterStyled";
import { Header } from "../../components/Header/Header";
import { Main } from "../../components/Main/Main";
import { LoginRegisterDiv } from "../../components/Form/LoginRegisterDiv/LoginRegisterDiv";
import { LoginRegisterForm } from "../../components/Form/LoginRegisterDiv/LoginRegisterForm/LoginRegisterForm";
import { Input } from "../../components/Form/LoginRegisterDiv/Input/Input";
import { ButtonStyled } from "../../components/Form/LoginRegisterDiv/Button/ButtonStyled";



export const Register = () => {
    const navigate = useNavigate();

    return (
        <RegisterStyled>
            <Header />
            <Main>
                <LoginRegisterDiv>
                    <LoginRegisterForm>
                        <Input placeholder="username: John Doe">
                            <MdDriveFileRenameOutline size={30} />
                        </Input>
                        <Input placeholder="document: 123.456.78-00">
                            <HiIdentification size={30} />
                        </Input>
                        <Input placeholder="email: user@mail.com">
                            <AiOutlineUser size={30} />
                        </Input>
                        <Input placeholder="password: ******">
                            <PiPasswordBold size={30} />
                        </Input>
                        <ButtonStyled onClick={() => navigate("/")}>
                            Register
                        </ButtonStyled>
                        <h2 className="black__text2">
                            Already a member?{" "}
                            <Link className="white__text" to="/">
                                Login
                            </Link>
                        </h2>
                    </LoginRegisterForm>
                </LoginRegisterDiv>
            </Main>
        </RegisterStyled>
    );
};
