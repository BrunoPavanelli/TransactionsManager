import { SiWebmoney } from "react-icons/si";

import { HeaderDivStyled, HeaderStyled } from "./HeaderStyled";
import { IChildrenOptional } from "../../@types/@globalTypes";

export const Header = ({children}: IChildrenOptional) => {
	return (
		<HeaderStyled>
			<HeaderDivStyled className="container__page">
				<h2 className="black__text0 fw__700 fs__30 letterspace__header desktop">Transactions<span className="blue__white__text">Manager</span></h2>
				<h2 className="black__text0 fw__700 fs__30 letterspace__header mobile">T<span className="blue__white__text">M</span></h2>
				<div className="navbar">
					{children}
					<SiWebmoney size={30} className="webmoney"/>
				</div>
			</HeaderDivStyled>
		</HeaderStyled>
	);
};