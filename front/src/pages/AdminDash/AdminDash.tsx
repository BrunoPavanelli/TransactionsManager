import { useContext } from "react";
import { CiLogout } from "react-icons/ci";

import { Header } from "../../components/Header/Header";
import { AdminDashStyled } from "./AdminDashStyled";
import { UsersContext } from "../../contexts/UsersContext/UsersContext";

export const AdminDash = () => {
    const { userLogout } = useContext(UsersContext);

    return (
        <AdminDashStyled>
            <Header children={<CiLogout className="logout" size={32} onClick={userLogout}/>}/>
        </AdminDashStyled>
    );
};