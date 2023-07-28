import { AppRoutes } from "./routes/Routes";
import { AppStyled } from "./styles/AppStyled";
import { Reset, GlobalStyle } from "./styles/GlobalStyles";


const App = () => {
	return (
		<>
			<Reset/>
			<GlobalStyle/>
			<AppStyled>
				<AppRoutes/>
			</AppStyled>
		</>
	);
};

export default App;
