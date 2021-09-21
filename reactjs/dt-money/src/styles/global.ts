import { createGlobalStyle } from 'styled-components';


export const GlobalStyle = createGlobalStyle`

    :root {
        --red: #E52E4D;
        --blue: #5429CC;
        --green: #33cc95;
        --blue-light: #6933ff;

        --text-title: #363F5F;
        --text-body: #969CB3;

        --shape: #ffffff;
        --background: #F0F2F5;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    // font-size: 16px (Desktop)
    // importante usar percentual porque a fonte vai variar conforme as opções do usuario,
    // exemplo: caso o user esteja com a opção de acessbilidade de aumento de zoom, 
    // a aplicação irá refletir essa opção
    html {
        @media (max-width: 1080px) {
            font-size: 93.75%;  //15px
        }

        @media (max-width: 720px) {
            font-size: 87.5%; //14px
        }
    }

    // REM => 1rem = font-size
    // se font-size = 16px -> 1rem = 16px
    // como a fonte varia conforme opcoes do user, consequentemente 
    // tudo que usar como medida REM acompannhará a mudança

    body {
        background: var(--background);
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }

    button {
        cursor: pointer;
    }

    [disabled] {
        opacity: 0.6;
        cursor: not-allowed;
    }

`




