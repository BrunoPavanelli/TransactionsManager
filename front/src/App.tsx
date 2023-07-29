import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Reset, GlobalStyle } from "./styles/GlobalStyles";
import { AppRoutes } from "./routes/Routes";
import { UsersProvider } from "./contexts/UsersContext/UsersContext";
import { AppStyled } from "./styles/AppStyled";

const App = () => {
	return (
		<>
			<Reset/>
			<GlobalStyle/>
				<UsersProvider>
					<AppStyled>
						<AppRoutes/>
					</AppStyled>
				</UsersProvider>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/>
		</>
	);
};

export default App;
