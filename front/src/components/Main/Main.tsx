import { IChildren } from "../../@types/@globalTypes";
import { MainStyled } from "./MainStyled";

export const Main = ({children}: IChildren) => {
	return (
		<MainStyled>
			{children}
		</MainStyled>
	);
};
