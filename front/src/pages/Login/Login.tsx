
import { Link, useNavigate } from "react-router-dom";
import { ButtonStyled } from "../../components/Form/LoginRegisterDiv/Button/ButtonStyled";
import { Input } from "../../components/Form/LoginRegisterDiv/Input/Input";
import { LoginRegisterDiv } from "../../components/Form/LoginRegisterDiv/LoginRegisterDiv";
import { LoginRegisterForm } from "../../components/Form/LoginRegisterDiv/LoginRegisterForm/LoginRegisterForm";
import { Header } from "../../components/Header/Header";
import { Main } from "../../components/Main/Main";
import { LoginStyled } from "./LoginStyled";

export const Login = () => {
    const navigate = useNavigate();

    return (
        <LoginStyled>
            <Header/>
            <Main>
                <LoginRegisterDiv>
                    <LoginRegisterForm>
                        <Input/>
                        <Input/>
                        <ButtonStyled onClick={() => navigate("/dashboard")}>Login</ButtonStyled>
                        <h2 className="black__text">Not a member? <Link className="white__text" to="/register">Sign up now</Link></h2>
                    </LoginRegisterForm>
                </LoginRegisterDiv>
            </Main>
        </LoginStyled>
    );
};