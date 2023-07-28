
import { Link, useNavigate } from "react-router-dom";
import { ButtonStyled } from "../../components/Form/LoginRegisterDiv/Button/ButtonStyled";
import { Input } from "../../components/Form/LoginRegisterDiv/Input/Input";
import { LoginRegisterDiv } from "../../components/Form/LoginRegisterDiv/LoginRegisterDiv";
import { LoginRegisterForm } from "../../components/Form/LoginRegisterDiv/LoginRegisterForm/LoginRegisterForm";
import { Header } from "../../components/Header/Header";
import { Main } from "../../components/Main/Main";
import { RegisterStyled } from "./RegisterStyled";

export const Register = () => {
    const navigate = useNavigate();
    
    return (
        <RegisterStyled>
            <Header/>
            <Main>
                <LoginRegisterDiv>
                    <LoginRegisterForm>
                        <Input/>
                        <Input/>
                        <Input/>
                        <Input/>
                        <ButtonStyled onClick={() => navigate("/")}>Register</ButtonStyled>
                        <h2 className="black__text">Already a member? <Link className="white__text" to="/">Login</Link></h2>
                    </LoginRegisterForm>
                </LoginRegisterDiv>
            </Main>
        </RegisterStyled>
    );
};