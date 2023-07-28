import { useContext } from "react";
import { TransactionsCard } from "../TransactionsCard/TransactionsCard";
import { TransactionsDivStyled } from "./TransactionsDivStyled";
import { TransactionsContext } from "../../../../contexts/TransactionsContext/transactionsContext";

export const TransactionsDiv = () => {
	const { transactions, convertTransactionData, filteredTransactions } = useContext(TransactionsContext);
	console.log(transactions, filteredTransactions);
	return (
		<TransactionsDivStyled className="container__page">
			{	
				filteredTransactions.length !== 0 
				? (filteredTransactions?.map(transaction => {
					transaction = convertTransactionData(transaction);
	
					return <TransactionsCard transaction={transaction} key={transaction.id}/>;
				}))
				: (transactions.map(transaction => {
					transaction = convertTransactionData(transaction);
	
					return <TransactionsCard transaction={transaction} key={transaction.id}/>;
				}))
			}
		</TransactionsDivStyled>
	);
};