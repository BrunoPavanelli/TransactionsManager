import { useContext } from "react";
import { CiLogout } from "react-icons/ci";

import { Header } from "../../components/Header/Header";
import { UserDashStyled } from "./UserDashStyled";
import { UsersContext } from "../../contexts/UsersContext/UsersContext";

export const UserDash = () => {
    const { userLogout } = useContext(UsersContext);

    return (
        <UserDashStyled>
            <Header children={<CiLogout className="logout" size={32} onClick={userLogout}/>}/>
        </UserDashStyled>
    );
};