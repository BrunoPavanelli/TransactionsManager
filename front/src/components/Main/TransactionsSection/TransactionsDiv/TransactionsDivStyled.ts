import { styled } from "styled-components";

export const TransactionsDivStyled = styled.ul`
    min-height: 50%;
    height: 75%;

    margin-inline: auto;

    overflow-y: auto;

    display: flex;
    flex-direction: column;
    gap: 1rem;

    &:first-child {
        border-radius: 0 50px 0 50px;
    }

    .notransactions {
        margin-inline: auto;
        margin-top: 1rem;
    }
`;