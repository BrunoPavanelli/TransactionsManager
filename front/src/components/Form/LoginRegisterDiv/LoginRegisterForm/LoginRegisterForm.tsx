import { IChildren } from "../../../../@types/@globalTypes";
import { LoginRegisterFormStyled } from "./LoginRegisterFormStyled";

export const LoginRegisterForm = ({children}: IChildren) => {
    return (
        <LoginRegisterFormStyled>
            {children}
        </LoginRegisterFormStyled>
    );
};