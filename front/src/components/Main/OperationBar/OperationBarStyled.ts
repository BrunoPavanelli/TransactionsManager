import { styled } from "styled-components";

export const OperationBarStyled = styled.div`
    width: 100%;
    height: 125px;

    background: rgb(59,65,72);
    background: linear-gradient(90deg, rgba(59,65,72,1) 0%, rgba(2,14,19,0.75) 37%, rgba(116,229,218,0.60) 100%);

    border-bottom: 2px solid black;

    display: flex;
    justify-content: center;
    align-items: center;

    .admin {
        display: flex;
        align-items: center;
        gap: 1rem;

        .file__upload {
            height: 100%;
            text-align: center;

            padding: 1.5rem;

            cursor: pointer;

            p {
                margin-top: 10px;
                color: #bbcada;

                transition: 0.25s;
            }

            input {
                display: none;
            }

            .upload {
                color: aliceblue;

                transition: 0.25s;
            }

            &:hover p{
                color: var(--black-0);
            }

            &:hover .upload{
                color: var(--black-0);
            }
        }

 
    }

    .navbar {
        width: max-content;

        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        position: relative;

        .bar__btn {
            cursor: pointer;
            background-color: transparent;

            transition: ease-in-out 0.25s;
            
            &:hover {
                color: aliceblue;
            }
        }
    }
`;

export const OperationBarDivStyled = styled.div`
    height: 125px;

    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const InputFileStyled = styled.input`

`;
