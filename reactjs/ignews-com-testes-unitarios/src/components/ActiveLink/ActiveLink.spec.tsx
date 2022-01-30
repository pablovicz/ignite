import { render } from "@testing-library/react";
import { ActiveLink } from ".";

jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/test'
            }
        }
    }
});


describe('ActiveLink Component', () => {

    it('renders correctly', () => {

        const { debug, getByText } = render(
            <ActiveLink href="/test" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
        )

        debug();  // mostra a representação do HTML virtual criado

        expect(getByText('Home')).toBeInTheDocument();
    });

    //test('active link is receiving active class', () => {
    it('adds active class if the link as currently active', () => {

        const { debug, getByText } = render(
            <ActiveLink href="/test" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
        )

        debug();  // mostra a representação do HTML virtual criado

        expect(getByText('Home')).toHaveClass("active");
    });


})


