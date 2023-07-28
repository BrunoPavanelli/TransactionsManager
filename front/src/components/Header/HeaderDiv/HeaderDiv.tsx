import { IChildren } from "../../../@types/@globalTypes";
import { HeaderDivStyled } from "./HeaderDivStyled";


export const HeaderDiv = ({children}: IChildren) => {
	return (
		<HeaderDivStyled className="container__page">
            <h2 className="black__text0">Transactions<span className="blue__white__text">Manager</span></h2>
            {children}
		</HeaderDivStyled>
	);
};