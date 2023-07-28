import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { UserDash } from "../pages/UserDash/UserDash";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Login />}/>
			<Route path="/register" element={<Register />}/>
			<Route path="/dashboard" element={<UserDash />}/>
			<Route path="/admin"/>
		</Routes>
	);
};