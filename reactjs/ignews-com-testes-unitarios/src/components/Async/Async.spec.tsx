import { render, screen, waitFor } from '@testing-library/react';
import { Async } from '.';


describe('Async Component', () => {

    it('renders correctly', async () => {
        render(<Async />)

        expect(screen.getByText('Hello World')).toBeInTheDocument();

        // find -> espera algo aparecer em tela, para então validar o dom
        expect(await screen.findByText('Button')).toBeInTheDocument();


        // repete várias vezes até que o expect passe
        await waitFor(() => {
            return expect(screen.getByText('Button')).toBeInTheDocument();
        }, { timeout: 1500 })


        /**
         *  3 tipos de métodos do screen
         * 
         *  1 - get...
         *      -> procuram um elemento de forma síncrona
         *      -> caso o elemento não exista em tela no momento da procura, retorna erro
         * 
         *  2 - query...
         *      -> procura um elemento de forma síncrona
         *      -> caso o elemento não exista em tela no momento da procura, NÃO retorna erro
         * 
         *  3 - find...
         *      -> procura um elemento de forma assíncrona
         *      -> fica monitorando por um certo tempo (configurável através do segundo parametro
         *         de timeout), até que o elemento apareça, caso não aconteça, retorna erro
         * 
         *  waitFor
         *   -> repete a operação várias vezes durante o timeout setado, caso em nenhuma das 
         * tentativas (dentro do timeout adotado) a operação se cumpra, retorna erro
         */
    })

});