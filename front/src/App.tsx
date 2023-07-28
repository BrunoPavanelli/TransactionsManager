import { UsersProvider } from "./contexts/UsersContext/UsersContext";
import { AppRoutes } from "./routes/Routes";
import { AppStyled } from "./styles/AppStyled";
import { Reset, GlobalStyle } from "./styles/GlobalStyles";


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
		</>
	);
};

export default App;
