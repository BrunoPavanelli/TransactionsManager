import { TransactionsCard } from "../TransactionsCard/TransactionsCard";
import { TransactionsDivStyled } from "./TransactionsDivStyled";

export const TransactionsDiv = () => {
	return (
		<TransactionsDivStyled>
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