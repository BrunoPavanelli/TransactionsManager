import { styled } from "styled-components";

export const SubtotalModalStyled = styled.div`
    width: 300px;
    height: 125px;

    border-radius: 1rem;
    background-color: rgba(2,14,19);

    position: absolute;
    right: -3rem;
    top: 2.5rem;

    div {
        width: 100%;
        height: 100%;

        position: relative;

        .close {
            color: var(--secondary-white-blue);
            
            cursor: pointer;

            position: absolute;
            right: 0.5rem;
            top: 0.5rem;
        }

        &:after {
            content: "";
            position: absolute;
            width: 0;
            height: 0;
            right: 1.55rem;
            border-left: 35px solid transparent;
            border-right: 35px solid transparent;
            border-bottom: 15px solid rgba(2,14,19);
            transform: translateY(100%);
            top: -1.65rem;
        }

        div {     
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            p {
                color: var(--primary-white-blue-opacity);
            }
        }
    }
`;