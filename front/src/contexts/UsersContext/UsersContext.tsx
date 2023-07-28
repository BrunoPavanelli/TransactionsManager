import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

            toast.success("Succes!");
        } catch (err) {
            toast.error("Invalid Credentials!");
            console.log(err);
        }
    };

    const userLogout = () => {
        localStorage.removeItem("@TransactionsM:Token");
        navigate("/");

        
        toast.success("Godbye!");
    };

    return (
        <UsersContext.Provider value={{userLogin, userLogout}}>
            {children}
        </UsersContext.Provider>
    );
};