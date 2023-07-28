import { FaWallet } from "react-icons/fa";

import { OperationBarDivStyled, OperationBarStyled } from "./OperationBarStyled";
import { SelectStyled } from "./Select/SelectStyled";

export const OperationBar = () => {
    return (
        <OperationBarStyled>
            <OperationBarDivStyled className="container__page">
                <h2 className="black__text0 fw__400 fs__25 letterspace__header desktop">Welcome<span className="blue__white__text"> User!</span></h2>
                <div className="navbar">
                    <SelectStyled>
                        <option>Status</option>
                        <option>In Analisys</option>
                        <option>In Analisys</option>
                        <option>In Analisys</option>
                    </SelectStyled>
					<FaWallet size={30} className="wallet"/>
				</div>
            </OperationBarDivStyled>
        </OperationBarStyled>
    );
};