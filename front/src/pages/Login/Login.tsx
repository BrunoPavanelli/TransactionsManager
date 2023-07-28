
import { ButtonStyled } from "../../components/Form/LoginRegisterDiv/Button/ButtonStyled";
import { Input } from "../../components/Form/LoginRegisterDiv/Input/Input";
import { LoginRegisterDiv } from "../../components/Form/LoginRegisterDiv/LoginRegisterDiv";
import { LoginRegisterForm } from "../../components/Form/LoginRegisterDiv/LoginRegisterForm/LoginRegisterForm";
import { Header } from "../../components/Header/Header";
import { Main } from "../../components/Main/Main";
import { LoginStyled } from "./LoginStyled";

export const Login = () => {
    return (
        <LoginStyled>
            <Header/>
            <Main>
                <LoginRegisterDiv>
                    <LoginRegisterForm>
                        <Input/>
                        <Input/>
                        <ButtonStyled>Login</ButtonStyled>
                        <h2 className="black__text">Not a member? <span className="white__text">Sign up now</span></h2>
                    </LoginRegisterForm>
                </LoginRegisterDiv>
            </Main>
        </LoginStyled>
    );
};