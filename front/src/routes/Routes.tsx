import { Route, Routes } from "react-router-dom";

import { ProtectedRoutes } from "./Outlets/ProtectedRoutes";
import { PublicRoutes } from "./Outlets/PublicRoutes";
import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";
import { UserDash } from "../pages/UserDash/UserDash";
import { AdminDash } from "../pages/AdminDash/AdminDash";
import { AdminRoutes } from "./Outlets/AdminRoutes";
import { TransactionsProvider } from "../contexts/TransactionsContext/TransactionsContext";
import { AdminTransactionsProvider } from "../contexts/TransactionsContext/AdminTransacitionsContext";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<PublicRoutes />}>
				<Route index element={<Login />}/>
				<Route path="/register" element={<Register />}/>
			</Route>
			<Route path="/dashboard" element={
				<TransactionsProvider>
					<ProtectedRoutes />
				</TransactionsProvider>
			}>
			<Route index element={<UserDash />}/>
			</Route>
			<Route path="/admin" element={
				<TransactionsProvider>
					<AdminTransactionsProvider>
						<AdminRoutes />
					</AdminTransactionsProvider>
				</TransactionsProvider>
			}>
				<Route index element={<AdminDash />}/>
			</Route>
		</Routes>
	);
};