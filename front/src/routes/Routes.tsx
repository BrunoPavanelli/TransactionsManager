import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { UserDash } from "../pages/UserDash/UserDash";
import { ProtectedRoutes } from "./Outlets/ProtectedRoutes";
import { PublicRoutes } from "./Outlets/PublicRoutes";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<PublicRoutes />}>
				<Route index element={<Login />}/>
				<Route path="/register" element={<Register />}/>
			</Route>
			<Route path="/dashboard" element={<ProtectedRoutes />}>
				<Route index element={<UserDash />}/>
			</Route>
			<Route path="/admin"/>
		</Routes>
	);
};