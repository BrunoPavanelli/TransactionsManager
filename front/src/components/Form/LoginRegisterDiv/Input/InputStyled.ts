import { styled } from "styled-components";

export const InputDivStyled = styled.div`
    width: 100%;
    min-height: 100px;

    background-color: var(--black-2);
    color: var(--white);
    
    border-radius: var(--br-8);
    
    display: flex;
`;

export const InputIconDivStyled = styled.div`
    width: 25%;
    min-height: 100px;

    background-color: var(--black-0);
    color: var(--primary-blue-white);
    
    border-radius: var(--br-8) 0 0 var(--br-8);

    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 880px) {
        display: none;
    }
`;

export const InputStyled = styled.input`
    width: 75%;
    min-height: 100px;

    padding-inline: 1rem;

    background-color: var(--black-2);
    color: var(--white);
    
    border-radius: var(--br-8);
`;