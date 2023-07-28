import { styled } from "styled-components";

export const LoginRegisterFormStyled = styled.form`
    width: 80%;
    max-width: 900px;
    height: 100%;

    box-sizing: border-box;
    padding: 8rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    @media (max-width: 880px) {
        padding: 0;
    }
`;