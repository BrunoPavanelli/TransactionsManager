import { styled } from "styled-components";

export const TransactionsCardStyled = styled.li`
    width: 100%;
    min-height: 150px;

    background-color: var(--black-2);


    border-radius: var(--br-8);

    padding-inline: 2rem;
    
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
        color: var(--secondary-white-blue);
    }
`;