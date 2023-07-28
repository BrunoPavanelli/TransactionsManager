import { createContext } from "react";
import { useNavigate } from "react-router-dom";

import { ILoginData, IUserContext } from "./@usersTypes";
import { IChildren } from "../../@types/@globalTypes";
import { api } from "../../service/api";

export const UsersContext = createContext<IUserContext>({} as IUserContext);

export const UsersProvider = ({children}: IChildren) => {
    // const [user, setUser] = useState();

    const navigate = useNavigate();

    const userLogin = async (loginData: ILoginData) => {
        try {
            const { data } = await api.post("/users/login", loginData);

            localStorage.setItem("@TransactionsM:Token", data.token);
            navigate("/dashboard");
        } catch (err) {
            console.log(err);
        }
    };

    const userLogout = () => {
        localStorage.removeItem("@TransactionsM:Token");
        navigate("/");
    };

    return (
        <UsersContext.Provider value={{userLogin, userLogout}}>
            {children}
        </UsersContext.Provider>
    );
};