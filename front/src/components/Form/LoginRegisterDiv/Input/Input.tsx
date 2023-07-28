import { InputDivStyled, InputIconDivStyled, InputStyled } from "./InputStyled";
import { IInput } from "../../../../@types/@globalTypes";

export const Input = ({ children, placeholder, register, type }: IInput) => {
    return (
        <InputDivStyled>
            <InputIconDivStyled>
                { children }
            </InputIconDivStyled>
            <InputStyled id={register.name} placeholder={placeholder} type={type} {...register}/>
        </InputDivStyled>
    );
};