import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import decode from 'jwt-decode';
import { AuthTokenError } from "../errors/AuthTokenError";
import { validateUserPermissions } from "./validateUserPermissions";

type WithSSRAuthOptions = {
    permissions?: string[];
    roles?: string[];
}



export function withSSRAuth<P>(fn: GetServerSideProps<P>, options?: WithSSRAuthOptions): GetServerSideProps {

    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {

        const cookies = parseCookies(ctx);
        const token = cookies['nextauth.token'];

        if (!token) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        if (options) {
            const user = decode<{ permissions: string[], roles: string[] }>(token);
            const { permissions, roles } = options;

            console.log(user);

            const userHasValidPermissions = validateUserPermissions({
                user,
                permissions,
                roles
            })

            if(!userHasValidPermissions){
                return {
                    redirect: {
                        //notFound: true //404,
                        destination: '/dashboard', //envia para uma pagina que todos os usuarios tem acesso
                        permanent: false
                    }
                }
            }
        }

        

        try {

            return await fn(ctx);

        } catch (err) {

            if (err instanceof AuthTokenError) {

                destroyCookie(ctx, 'nextauth.token');
                destroyCookie(ctx, 'nextauth.refreshToken');

                return {
                    redirect: {
                        destination: '/',
                        permanent: false
                    }
                }
            }
        }

    }
}