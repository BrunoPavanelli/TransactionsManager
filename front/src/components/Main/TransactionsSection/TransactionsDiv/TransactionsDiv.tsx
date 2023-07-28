import { useContext } from "react";
import { TransactionsCard } from "../TransactionsCard/TransactionsCard";
import { TransactionsDivStyled } from "./TransactionsDivStyled";
import { TransactionsContext } from "../../../../contexts/TransactionsContext/transactionsContext";

export const TransactionsDiv = () => {
	const { transactions, convertTransactionData } = useContext(TransactionsContext);

	return (
		<TransactionsDivStyled className="container__page">
			{transactions?.map(transaction => {
				transaction = convertTransactionData(transaction);

				return <TransactionsCard transaction={transaction}/>;
			})}
		</TransactionsDivStyled>
	);
};