import { TransactionsCard } from "../TransactionsCard/TransactionsCard";
import { TransactionsDivStyled } from "./TransactionsDivStyled";

export const TransactionsDiv = () => {
	return (
		<TransactionsDivStyled className="container__page">
			<TransactionsCard/>
			<TransactionsCard/>
			<TransactionsCard/>
			<TransactionsCard/>
			<TransactionsCard/>
			<TransactionsCard/>
			<TransactionsCard/>
			<TransactionsCard/>
		</TransactionsDivStyled>
	);
};