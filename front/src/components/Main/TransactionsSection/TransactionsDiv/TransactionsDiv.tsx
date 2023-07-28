import { useContext } from "react";
import { TransactionsCard } from "../TransactionsCard/TransactionsCard";
import { TransactionsDivStyled } from "./TransactionsDivStyled";
import { UsersContext } from "../../../../contexts/UsersContext/UsersContext";

export const TransactionsDiv = () => {
	const { transactions, convertTransactionData } = useContext(UsersContext);

	return (
		<TransactionsDivStyled className="container__page">
			{transactions?.map(transaction => {
				transaction = convertTransactionData(transaction);

				return <TransactionsCard transaction={transaction}/>;
			})}
		</TransactionsDivStyled>
	);
};