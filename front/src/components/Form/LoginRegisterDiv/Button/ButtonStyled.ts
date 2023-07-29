import { styled } from "styled-components";

export const ButtonStyled = styled.button`
    width: 100%;
    min-height: 100px;
    
    background: rgb(116,229,218);
    background: linear-gradient(90deg, rgba(116,229,218,0.8) 9%, rgba(59,65,72,1) 94%);
    color: var(--white);

    font-size: var(--fs-25);
    font-weight: var(--fw-500);
    letter-spacing: 0.0755rem;

    border-radius: var(--br-8);

    display: flex;
    justify-content: center;
    align-items: center;
`;