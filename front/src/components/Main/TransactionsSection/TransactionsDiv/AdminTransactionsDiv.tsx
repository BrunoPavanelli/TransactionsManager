import { useContext } from "react";

import { TransactionsCard } from "../TransactionsCard/TransactionsCard";
import { TransactionsDivStyled } from "./TransactionsDivStyled";
import { AdminTransactionsContext } from "../../../../contexts/TransactionsContext/AdminTransacitionsContext";
import { TransactionsContext } from "../../../../contexts/TransactionsContext/TransactionsContext";

export const AdminTransactionsDiv = () => {
	const { allTransactions, filteredTransactions } = useContext(AdminTransactionsContext);
	const { convertTransactionData } = useContext(TransactionsContext);
	
	return (
		<TransactionsDivStyled className="container__page">
			<div className="header">
				<p>User</p>
				<p>Description</p>
				<p>Date</p>
				<p>Value in Points</p>
				<p>Value</p>
				<p>Status</p>
			</div>
			<ul>
				{
					filteredTransactions.length === 0 
					? allTransactions.map(transaction => {
						transaction = convertTransactionData(transaction);
					
						return <TransactionsCard transaction={transaction} key={transaction.id}/>;
					})
					: filteredTransactions.map(transaction => {
						transaction = convertTransactionData(transaction);
					
						return <TransactionsCard transaction={transaction} key={transaction.id}/>;
					})
				}
			</ul>
		</TransactionsDivStyled>
	);
};

