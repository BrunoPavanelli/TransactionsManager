import { Header } from "../Header/Header";
import { MainStyled } from "./MainStyled";
import { TransactionsSection } from "./TransactionsSection/TransactionsSection";

export const Main = () => {
	return (
		<MainStyled>
			<Header />
			<TransactionsSection/>
		</MainStyled>
	);
};
