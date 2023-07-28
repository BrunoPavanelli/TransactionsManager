import { Aside } from "./components/Aside/Aside";
import { Main } from "./components/Main/Main";
import { AppStyled } from "./styles/AppStyled";


const App = () => {
	return (
		<>
			<AppStyled>
				<Aside/>
				<Main/>
			</AppStyled>
		</>
	);
};

export default App;
