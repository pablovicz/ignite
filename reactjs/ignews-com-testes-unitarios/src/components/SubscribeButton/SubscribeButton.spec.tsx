import { signIn, useSession } from 'next-auth/client';

import { render, screen, fireEvent } from "@testing-library/react";
import { SubscribeButton } from ".";
import { mocked } from 'ts-jest/utils';
import { useRouter } from 'next/router';


jest.mock('next/router');
jest.mock('next-auth/client');


describe('SubscribeButton Component', () => {

    it('renders correctly', () => {
        const useSessionMocked = mocked(useSession);
        useSessionMocked.mockReturnValueOnce([null, false]);

        render(<SubscribeButton />)
        expect(screen.getByText('Subscribe now')).toBeInTheDocument();
    });

    it('redirects user to sign in when not authenticated', () => {
        const signInMocked = mocked(signIn);
        const useSessionMocked = mocked(useSession);
        useSessionMocked.mockReturnValueOnce([null, false]);

        
        
        render(<SubscribeButton />);

        const subscribeButton = screen.getByText('Subscribe now');

        fireEvent.click(subscribeButton);

        expect(signInMocked).toHaveBeenCalled();

    })

    it('redirects to posts when user already has a subscription', () => {

        const useRouterMocked = mocked(useRouter);
        const useSessionMocked = mocked(useSession);
        const pushMocked = jest.fn();

        useSessionMocked.mockReturnValueOnce([
            {
            user: { 
                name: 'John Doe', 
                email: 'john.doe@example.com'
            },
            activeSubscription: 'fake-active-subscription', 
            expires: 'fake-expires'
        }, false]);

        useRouterMocked.mockReturnValueOnce({
            push: pushMocked,
        } as any);

        render(<SubscribeButton />);

        const subscribeButton = screen.getByText('Subscribe now');

        fireEvent.click(subscribeButton);

        expect(pushMocked).toHaveBeenCalledWith('/posts');


    })

});