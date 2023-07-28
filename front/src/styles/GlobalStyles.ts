import { createGlobalStyle } from "styled-components";

export const Reset = createGlobalStyle`
    html, body, main, dialog, figure, img, div, section, article, input, select, button, textarea, p, h1, h2, h3, h4, h5, h6, ul, li, a{
        margin: 0;
        padding: 0;

        border: none;
        outline: none;
        list-style: none; 
        text-decoration: none;
        color: red;
        
        -webkit-box-sizing: border-box;
        box-sizing: border-box;

        button {
            cursor: pointer;
        }
    }
`;

export const GlobalStyle = createGlobalStyle`
    :root {
        /* Colors */
        --white: #fff;
        --black: #2D3338;
        --black-2: #353B40;
        --black-3: #3B4148;
        --primary-blue: #6069F0;
        --primary-white-blue: #74E5DA;
        --secondary-white-blue: #BDF8EF;
        --error-form: #FC035D;

        /* Font-Family */
        /* --ff-Oswald: 'Oswald', sans-serif;
        --ff-Inter: 'Inter', sans-serif; */

        /* Font-Size */
        --fs-50: 3.125rem;
        --fs-30: 1.875rem;
        --fs-29: 1.8125rem;
        --fs-25: 1.5625rem;
        --fs-20: 1.25rem;
        --fs-19: 1.2rem;
        --fs-16: 1rem;
        --fs-10: .625rem;

        /* Font-Weight */
        --fw-700: 700;
        --fw-600: 600;
        --fw-500: 500;
        --fw-400: 400;

        /* Border-Radius */
        --br-8: 8px;

        /* Heights */
        --inpt-height: 3.125rem;
        --btn-height: 2.625rem;
        --box-title-height: 5.875rem;
        --links-distance-line-to-text: 1.815rem;
        --post-height: 8rem;
    }

    /* Utility-Classes */
    /* Container */
    .container__page {
        /* max-width: max-content; */
        min-width: 80%;
        max-width: 1000px;
        height: 100%;
/* 
        margin: auto;
        padding-block: 68px;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between; */
    }
    .container__pages--forms {
        padding-inline: 7rem;
    }

    .container__pages {
        padding-inline: 20px;
    }

    .burger__menu {
        width: max-content;

        cursor: pointer;
     }

     .close__menu {
        width: max-content;

        cursor: pointer;
     }

    /* Texts */
     .white__text {
        color: var(--white);
     }

    .black__text {
        color: var(--black-3);
    }

    .primary__blue__text {
        color: var(--primary-blue);
    }

    .blue__white__text {
        color: var(--primary-white-blue);
    }
`;