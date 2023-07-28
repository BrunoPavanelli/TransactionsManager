import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
    const token = localStorage.getItem("@TransactionsM:Token");

    return token ? <Outlet /> : <Navigate to="/"/>;
};