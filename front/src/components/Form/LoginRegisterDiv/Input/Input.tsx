import { InputDivStyled, InputIconDivStyled, InputStyled } from "./InputStyled";
import { IInput } from "../../../../@types/@globalTypes";

export const Input = ({ children, placeholder, register, type, errors }: IInput) => {
    return (
        <InputDivStyled>
            <InputIconDivStyled>
                { children }
            </InputIconDivStyled>
            <InputStyled id={register.name} placeholder={placeholder} type={type} {...register}/>
            { errors? <p className="errors_text">{errors}</p> : null }
        </InputDivStyled>
    );
};