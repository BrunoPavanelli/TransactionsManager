import { styled } from "styled-components";

export const TransactionsDivStyled = styled.div`
    min-height: 50%;
    height: 100%;

    margin-inline: auto;

    .header {
        background-color: red;
        width: 100%;
        min-height: 75px;  

        margin-inline: auto;

        background: rgb(2,14,19);
        background: linear-gradient(95deg, rgba(2,14,19,0.71) 0%, rgba(116,229,218,0.5) 10%, rgba(116,229,218,0.5) 91%, rgba(2,14,19,0.7133228291316527) 100%);

        padding-left: 2rem;
        padding-right: 3rem;
        
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    ul {
        height: calc(100% - 75px);
        width: 100%;

        overflow-y: auto;

        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .notransactions {
        margin-inline: auto;
        margin-top: 1rem;
    }
`;