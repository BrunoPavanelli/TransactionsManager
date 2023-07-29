import { AiOutlineCloseCircle } from "react-icons/ai";
import { SubtotalModalStyled } from "./SubtotalModalStyled";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionsContext/TransactionsContext";

export const SubtotalModal = () => {
    const { setOpenModal } = useContext(TransactionsContext);
    return (
        <SubtotalModalStyled role="dialog">
            <div>
                <div>         
                    <AiOutlineCloseCircle size={25} className="close" onClick={() => setOpenModal(false)} />
                    <p className="fw__600 fs__19">For Approved Transactions:</p>
                    <p>Subtotal: $10.000.000,00</p>
                </div>
            </div>
        </SubtotalModalStyled>
    );
};