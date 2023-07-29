import { IChildren } from "../../../@types/@globalTypes";
import { TransactionsSectionStyled } from "./TransactionsSectionStyled";

export const TransactionsSection = ({children}: IChildren) => {
	return (
		<TransactionsSectionStyled>
			{children}
		</TransactionsSectionStyled>
	);
};