import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { getPrismicClient } from '../../services/prismic';


import Post, { getServerSideProps } from '../../pages/posts/[slug]';
import { getSession } from 'next-auth/client';


jest.mock('../../services/prismic');
jest.mock('next-auth/client');


const post = {
    slug: 'my-new-post',
    title: "My New Post",
    content: "<p>Post content</p>",
    updatedAt: 'January, 31'
}



describe('Post page', () => {

    it('renders correctly', () => {
        render(
            <Post
                post={post}
            />
        )

        expect(screen.getByText('My New Post')).toBeInTheDocument();
        expect(screen.getByText('Post content')).toBeInTheDocument();
    })

    it('redirects user if no subscription is found', async () => {

        const getSessionMocked = mocked(getSession);

        getSessionMocked.mockResolvedValueOnce({
            activeSubscription: null
        } as any);

        const response = await getServerSideProps({ params: { slug: 'my-new-post' } } as any);

        expect(response).toEqual(
            expect.objectContaining({
                redirect: expect.objectContaining(
                    {
                        destination: '/',
                        permanent: false
                    }
                )
            })
        )
    });


    it('loads initial data', async () => {
        const getSessionMocked = mocked(getSession);

        getSessionMocked.mockResolvedValueOnce({
            activeSubscription: 'fake-active-subscription'
        } as any);


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



        const response = await getServerSideProps({ params: { slug: 'my-new-post' } } as any);


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