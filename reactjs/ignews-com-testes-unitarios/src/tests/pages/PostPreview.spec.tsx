import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { getPrismicClient } from '../../services/prismic';


import PostPreview, { getStaticProps } from '../../pages/posts/preview/[slug]';
import { getSession, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';


jest.mock('../../services/prismic');
jest.mock('next-auth/client');
jest.mock('next/router');


const post = {
    slug: 'my-new-post',
    title: "My New Post",
    content: "<p>Post content</p>",
    updatedAt: 'January, 31'
}



describe('PostPreview page', () => {

    it('renders correctly', () => {

        const useSessionMocked = mocked(useSession);

        useSessionMocked.mockReturnValueOnce([null, false]);


        render(
            <PostPreview
                post={post}
            />
        )

        expect(screen.getByText('My New Post')).toBeInTheDocument();
        expect(screen.getByText('Post content')).toBeInTheDocument();
        //expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument();
    })


    it('redirects user to full post when user is subscribed', () => {

        const useSessionMocked = mocked(useSession);
        const useRouterMocked = mocked(useRouter);
        const pushMock = jest.fn();

        useSessionMocked.mockReturnValueOnce([
            { activeSubscription: 'fake-active-subscription' },
            false
        ] as any);



        useRouterMocked.mockReturnValueOnce({
            push: pushMock
        } as any);

        render(
            <PostPreview
                post={post}
            />
        )


        expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post');


    });


    it('loads initial data', async () => {

        const getPrismicClientMocked = mocked(getPrismicClient);
        getPrismicClientMocked.mockReturnValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
                data: {
                    title: [{
                        type: "heading", text: "My new post"
                    }],
                    content: [
                        { type: "paragraph", text: "Post content" }
                    ]
                },
                last_publication_date: '01-31-2022'
            })
        } as any)

        getPrismicClientMocked.mockReturnValueOnce({
            query: jest.fn().mockResolvedValueOnce({
                results: [
                    {
                        uid: 'my-new-post',
                        data: {
                            title: [{
                                type: "heading", text: "My new post"
                            }],
                            content: [
                                { type: "paragraph", text: "Post content" }
                            ]
                        },
                        last_publication_date: '01-31-2022'
                    }
                ]
            })
        } as any);



        const response = await getStaticProps({ params: { slug: 'my-new-post' } } as any);


        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    post: {
                        slug: 'my-new-post',
                        title: 'My new post',
                        content: '<p>Post content</p>',
                        updatedAt: '31 de janeiro de 2022'

                    }
                }
            })
        );

    });

})