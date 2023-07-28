import { styled } from "styled-components";

export const HeaderDivStyled = styled.header`
    height: 125px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .webmoney {
        color: var(--primary-white-blue);
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