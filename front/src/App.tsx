// import { Aside } from "./components/Aside/Aside";
// import { Main } from "./components/Main/Main";
import { Login } from "./pages/Login/Login";
import { AppStyled } from "./styles/AppStyled";
import { Reset, GlobalStyle } from "./styles/GlobalStyles";


const App = () => {
	return (
		<>
			<Reset/>
			<GlobalStyle/>
			<AppStyled>
				<Login/>
			</AppStyled>
		</>
	);
};

export default App;
