import { useContext } from "react";
import { TransactionsCard } from "../TransactionsCard/TransactionsCard";
import { TransactionsDivStyled } from "./TransactionsDivStyled";
import { TransactionsContext } from "../../../../contexts/TransactionsContext/TransactionsContext";

export const TransactionsDiv = () => {
	const { transactions, convertTransactionData, filteredTransactions } = useContext(TransactionsContext);
	return (
		<TransactionsDivStyled className="container__page">
			<div className="header">
				{/* {role === "admin" ? <p>User</p> : null} */}
				<p>Description</p>
				<p>Date</p>
				<p>Value in Points</p>
				<p>Value</p>
				<p>Status</p>
			</div>
			<ul>
				{	
					transactions.length === 0 
					? <p className="notransactions fw__500 fs__29">There is no <span className="blue__white__text">Transactions</span> for you yet!</p>
					: filteredTransactions.length !== 0 
					? (filteredTransactions?.map(transaction => {
						transaction = convertTransactionData(transaction);
					
						return <TransactionsCard transaction={transaction} key={transaction.id}/>;
					}))
					: (transactions.map(transaction => {
						transaction = convertTransactionData(transaction);
					
						return <TransactionsCard transaction={transaction} key={transaction.id}/>;
					}))

				}
			</ul>
		</TransactionsDivStyled>
	);
};

