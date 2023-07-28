import { styled } from "styled-components";

export const TransactionsSectionStyled = styled.section`
    width: 100%;
    height: 100vh;
   
    display: flex;
    justify-content: center;

    padding-block: 35px;

    display: flex;
    flex-direction: column;

    .header {
        background-color: red;
        height: 75px;
        width: 80%;
        margin-inline: auto;

        background: rgb(2,14,19);
        background: linear-gradient(95deg, rgba(2,14,19,0.71) 0%, rgba(116,229,218,0.5) 10%, rgba(116,229,218,0.5) 91%, rgba(2,14,19,0.7133228291316527) 100%);

        padding-left: 2rem;
        padding-right: 3rem;
        
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;