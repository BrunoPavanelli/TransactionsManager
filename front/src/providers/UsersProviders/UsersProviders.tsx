import { createContext } from "react";

import { IUserContext } from "./@usersTypes";
import { IChildren } from "../../@types/@globalTypes";

export const UsersContext = createContext<IUserContext>({} as IUserContext);

export const UsersProvider = ({children}: IChildren) => {

    return (
        <UsersContext.Provider value={{}}>
            {children}
        </UsersContext.Provider>
    );
};