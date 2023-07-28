import { TransactionsDiv } from "./TransactionsDiv/TransactionsDiv";
import { TransactionsSectionStyled } from "./TransactionsSectionStyled";

export const TransactionsSection = () => {
	return (
		<TransactionsSectionStyled>
			<div className="header">
				<p>Description</p>
				<p>Date</p>
				<p>Value in Points</p>
				<p>Value</p>
				<p>Status</p>
			</div>
			<TransactionsDiv/>
		</TransactionsSectionStyled>
	);
};