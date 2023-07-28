import { IChildren } from "../../../@types/@globalTypes";
import { LoginRegisterDivStyled } from "./LoginRegisterDivStyled";

export const LoginRegisterDiv = ({children}: IChildren) => {
    return (
        <LoginRegisterDivStyled>
            {children}
        </LoginRegisterDivStyled>
    );
};