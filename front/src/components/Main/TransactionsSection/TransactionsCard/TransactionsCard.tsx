import { ITransaction } from "../../../../contexts/TransactionsContext/@transactionsTypes";
import { TransactionsCardStyled } from "./TransactionsCardStyled";

interface ITransactionsCardProps {
	transaction: ITransaction
}

export const TransactionsCard = ({ transaction }: ITransactionsCardProps) => {
	return (
		<TransactionsCardStyled>
			<p>{transaction.description}</p>
			<p>{transaction.date}</p>
			<p>{transaction.points_value}</p>
			<p>{transaction.value}</p>
			<p>{transaction.status}</p>
		</TransactionsCardStyled>
	);
};