import { styled } from "styled-components";

export const InputStyled = styled.input`
    width: 9rem;
    height: 22px;

    padding-left: 0.4rem;
    background-color: var(--black-3);

    border-radius: 0.25rem;

    color: var(--secondary-white-blue);

    cursor: pointer;

    &::placeholder {
        color: var(--secondary-white-blue);   
    }
`;