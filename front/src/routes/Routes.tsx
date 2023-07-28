import { Route, Routes } from "react-router-dom";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/"/>
			<Route path="/register"/>
			<Route path="/dashboard"/>
			<Route path="/admin"/>
		</Routes>
	);
};