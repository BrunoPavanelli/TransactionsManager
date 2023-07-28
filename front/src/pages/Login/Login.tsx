
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { PiPasswordBold } from "react-icons/pi";

import { LoginStyled } from "./LoginStyled";
import { Header } from "../../components/Header/Header";
import { Main } from "../../components/Main/Main";
import { Input } from "../../components/Form/LoginRegisterDiv/Input/Input";
import { ButtonStyled } from "../../components/Form/LoginRegisterDiv/Button/ButtonStyled";
import { LoginRegisterDiv } from "../../components/Form/LoginRegisterDiv/LoginRegisterDiv";
import { LoginRegisterForm } from "../../components/Form/LoginRegisterDiv/LoginRegisterForm/LoginRegisterForm";

export const Login = () => {
    const navigate = useNavigate();

    return (
        <LoginStyled>
            <Header/>
            <Main>
                <LoginRegisterDiv>
                    <LoginRegisterForm>
                        <Input placeholder="email: user@mail.com">
                            <AiOutlineUser size={30}/>
                        </Input>
                        <Input placeholder="password: ******">
                            <PiPasswordBold size={30}/>
                        </Input>
                        <ButtonStyled onClick={() => navigate("/dashboard")}>Login</ButtonStyled>
                        <h2 className="black__text2">Not a member? <Link className="white__text" to="/register">Sign up now</Link></h2>
                    </LoginRegisterForm>
                </LoginRegisterDiv>
            </Main>
        </LoginStyled>
    );
};