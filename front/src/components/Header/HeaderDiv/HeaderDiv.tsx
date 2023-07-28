import { SiWebmoney } from "react-icons/si";

import { IChildren } from "../../../@types/@globalTypes";
import { HeaderDivStyled } from "./HeaderDivStyled";

export const HeaderDiv = ({children}: IChildren) => {
	return (
		<HeaderDivStyled className="container__page">
            <h2 className="black__text0 fw__700 fs__30 letterspace__header desktop">Transactions<span className="blue__white__text">Manager</span></h2>
			<h2 className="black__text0 fw__700 fs__30 letterspace__header mobile">T<span className="blue__white__text">M</span></h2>
			<SiWebmoney size={30} className="webmoney"/>
            {children}
		</HeaderDivStyled>
	);
};