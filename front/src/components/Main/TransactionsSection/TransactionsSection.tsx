import { IChildren } from "../../../@types/@globalTypes";
import { TransactionsSectionStyled } from "./TransactionsSectionStyled";

interface ITransactionsSection extends IChildren {
	role: string
}

export const TransactionsSection = ({children, role}: ITransactionsSection) => {
	return (
		<TransactionsSectionStyled>
			<div className="header">
				{role === "admin" ? <p>User</p> : null}
				<p>Description</p>
				<p>Date</p>
				<p>Value in Points</p>
				<p>Value</p>
				<p>Status</p>
			</div>
			{children}
		</TransactionsSectionStyled>
	);
};