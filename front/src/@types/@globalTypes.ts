import { ReactNode } from "react";

export interface IChildren {
    children: ReactNode
}

export interface IInput extends IChildren {
    placeholder: string
}