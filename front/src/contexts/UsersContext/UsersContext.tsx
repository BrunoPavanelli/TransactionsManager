import { createContext, useState } from "react";

import { ILoginData, IUserContext } from "./@usersTypes";
import { IChildren } from "../../@types/@globalTypes";
import { api } from "../../service/api";

export const UsersContext = createContext<IUserContext>({} as IUserContext);

export const UsersProvider = ({children}: IChildren) => {
    const [user, setUser] = useState();

    const userLogin = async (data: ILoginData) => {
        try {
            const response = await api.post("/users/login", data);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <UsersContext.Provider value={{userLogin}}>
            {children}
        </UsersContext.Provider>
    );
};