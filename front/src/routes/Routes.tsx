import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Login />}/>
			<Route path="/register" element={<Register />}/>
			<Route path="/dashboard"/>
			<Route path="/admin"/>
		</Routes>
	);
};