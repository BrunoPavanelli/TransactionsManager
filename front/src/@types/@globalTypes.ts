import { ReactNode } from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { ILoginData, IRegisterData } from "../contexts/UsersContext/@usersTypes";

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
    errors?: string
}

export interface IDecodedToken {
    cpf: string
    exp: bigint
    iat: bigint
    role: string
    sub: string
}