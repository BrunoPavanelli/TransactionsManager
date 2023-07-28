import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = () => {
    const token = localStorage.getItem("@TransactionsM:Token");

    return !token ? <Outlet /> : <Navigate to="/dashboard"/>;
};