import { useContext } from "react";

import { TransactionsCard } from "../TransactionsCard/TransactionsCard";
import { TransactionsDivStyled } from "./TransactionsDivStyled";
import { AdminTransactionsContext } from "../../../../contexts/TransactionsContext/AdminTransacitionsContext";
import { TransactionsContext } from "../../../../contexts/TransactionsContext/TransactionsContext";

export const AdminTransactionsDiv = () => {
	const { allTransactions } = useContext(AdminTransactionsContext);
	const { convertTransactionData } = useContext(TransactionsContext);
	
	return (
		<TransactionsDivStyled className="container__page">
			{
				allTransactions.map(transaction => {
					transaction = convertTransactionData(transaction);
				
					return <TransactionsCard transaction={transaction} key={transaction.id}/>;
				})
			
			}
		</TransactionsDivStyled>
	);
};

