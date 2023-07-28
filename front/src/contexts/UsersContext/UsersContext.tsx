import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { toast } from "react-toastify";

import { ILoginData, IRegisterData, IUser, IUserContext } from "./@usersTypes";
import { IChildren, IDecodedToken } from "../../@types/@globalTypes";
import { api } from "../../service/api";

export const UsersContext = createContext<IUserContext>({} as IUserContext);

export const UsersProvider = ({children}: IChildren) => {
    const [user, setUser] = useState<IUser | null>(null);

    const navigate = useNavigate();

    const userLogin = async (loginData: ILoginData) => {
        try {
            const { data } = await api.post("/users/login", loginData);

            const decodedToken: IDecodedToken = jwt_decode(data.token);

            localStorage.setItem("@TransactionsM:Token", data.token);
            decodedToken.role === "admin"? navigate("/admin") : navigate("/dashboard");

            toast.success("Succes!");
        } catch (err) {
            toast.error("Invalid Credentials!");
            console.log(err);
        }
    };

    const userRegister = async (registerData: IRegisterData) => {
        try {
            await api.post("/users", registerData);
            navigate("/");

            toast.success("Registered with Succes!");
        } catch (err) {
            console.log(err);
        }
    };

    const userLogout = () => {
        localStorage.removeItem("@TransactionsM:Token");
        navigate("/");

        
        toast.success("Godbye!");
    };

    const retrieveUserData = async () => {
        const token = localStorage.getItem("@TransactionsM:Token");
        try {
            const { data } = await api.get("/users/token", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }); 
            setUser(data);

        } catch (error) {
            toast.error("Some Error in User Data req");
            console.log(error);
        }       
    };

    return (
        <UsersContext.Provider value={{
                userLogin, 
                userLogout,
                user,
                setUser,
                retrieveUserData,
                userRegister
            }}>
            {children}
        </UsersContext.Provider>
    );
};