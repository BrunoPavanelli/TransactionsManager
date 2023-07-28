import { InputDivStyled, InputIconDivStyled, InputStyled } from "./InputStyled";
import { IInput } from "../../../../@types/@globalTypes";

export const Input = ({children, placeholder}: IInput) => {
    return (
        <InputDivStyled>
            <InputIconDivStyled>
                { children }
            </InputIconDivStyled>
            <InputStyled placeholder={placeholder}>
            </InputStyled>
        </InputDivStyled>
    );
};