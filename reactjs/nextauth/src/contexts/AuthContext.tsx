import { createContext, ReactNode, useEffect, useState } from 'react';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
import Router from 'next/router';
import { api } from '../services/apiClient';


type User = {
    email: string;
    permissions: string[];
    roles: string[];
}

type SignInCredentials = {
    email: string;
    password: string;
}


type AuthContextData = {
    signIn: (createntials: SignInCredentials) => Promise<void>;
    signOut: () => void;
    user: User;
    isAuthenticated: boolean;

};

export const AuthContext = createContext({} as AuthContextData);


// comunica as abas da aplicação
let authChannel: BroadcastChannel;

type AuthProviderProps = {
    children: ReactNode;
}

export function signOut() {
    destroyCookie(undefined, 'nextauth.token');
    destroyCookie(undefined, 'nextauth.refreshedToken');

    authChannel.postMessage('signOut');

    Router.push('/');
}


export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User>();
    const isAuthenticated = !!user;

    useEffect(() => {

        authChannel = new BroadcastChannel('auth');

        authChannel.onmessage = (message) => {
            switch (message.data) {
                case 'signOut':
                    signOut();
                    break;
                default:
                    break;
            }
        }
    }, [])

    useEffect(() => {
        const { 'nextauth.token': token } = parseCookies();

        if (token) {
            api.get('/me')
                .then(response => {
                    const { email, permissions, roles } = response.data;

                    setUser({ email, permissions, roles })
                })
                .catch(() => {
                    signOut();
                })
        }

    }, [])

    async function signIn({ email, password }: SignInCredentials) {
        console.log('Signing In')

        try {


            const response = await api.post('sessions', {
                email,
                password
            })

            const { token, refreshToken, permissions, roles } = response.data;
            // sessionStorage -> nao fica disponivel em outras sessions (abrir e fechar navegador, morreu)
            // localStorage -> acessivel somente pelo lado do browser, nao indicado no caso com Next
            // cookies -> acessivel pelo browser e pelo server (lib nookies)

            setCookie(undefined, 'nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, //30 dias, quanto tempo ficará salvo
                path: '/' //quais caminhos da aplicação terão acesso ao cookie
            });
            setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
                maxAge: 60 * 60 * 24 * 30,
                path: '/'
            });

            setUser({
                email, permissions, roles
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            console.log('Signed In - success')
            console.log(response.data)
            Router.push('/dashboard');

        } catch (err) {
            console.log('Signed In - failed')
            console.log(err);
        }
    }

    return (
        <AuthContext.Provider value={{ signIn, isAuthenticated, user, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}


