import { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface IChildren {
    children: ReactNode;
}

export interface IChildrenOptional {
    children?: ReactNode;
}

export interface IInput extends IChildren {
    placeholder: string;
    type: string;
    register: UseFormRegisterReturn<string>;
}

export interface IDecodedToken {
    cpf: string
    exp: bigint
    iat: bigint
    role: string
    sub: string
}