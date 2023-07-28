import { styled } from "styled-components";

export const HeaderStyled = styled.header`
    height: 125px;

    background-color: var(--primary-orange);

    border-bottom: 2px solid black;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const HeaderDivStyled = styled.header`
    height: 125px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .navbar {
        width: max-content;

        display: flex;
        gap: 1rem;
    }

    .webmoney {
        color: var(--primary-white-blue);
    }

    .logout {
        color: var(--primary-white-blue);
        cursor: pointer;
    }

    .mobile {
        display: none;
    }

    @media (max-width: 475px) {
        .desktop {
            display: none; 
        }

        .mobile {
            display: block;
        }
    }
`;