import { Navigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { IDecodedToken } from "../../@types/@globalTypes";

export const AdminRoutes = () => {
    const token = localStorage.getItem("@TransactionsM:Token");

    if (token) {
        const decodedToken: IDecodedToken = jwt_decode(token);

        return decodedToken.role === "admin" ? <Outlet /> : <Navigate to="/dashboard"/>;
    }

    return <Navigate to="/"/>;
};