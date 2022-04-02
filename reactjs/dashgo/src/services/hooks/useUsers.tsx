import { useQuery } from "react-query";
import { api } from "../api";

type User = {
    id: string;
    name: string;
    email: string;
    createdAt: string;
}

type GetUsersResponse = {
    totalCount: number;
    users: User[];
}


type GetUserResponse = User;

async function getUsers(page: number): Promise<GetUsersResponse> {
    const { data } = await api.get('/users', {
        params: {
            page,
        }
    });

    const totalCount = Number(data.totalCount)

    const users = data.users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: new Date(user.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    });

    return { users, totalCount }
}


async function getUser(userId: string): Promise<GetUserResponse> {
    const { data } = await api.get(`/users/${userId}`);
    const user = {
        id: data.id,
        name: data.name,
        email: data.email,
        createdAt: new Date(data.created_at).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }


    return user
}


export function useUsers(page: number) {

    return useQuery<GetUsersResponse>(['users', page], () => getUsers(page), {
        staleTime: 1000 * 60 * 10 // durante 10 minutos a query torna-se obsoleta
    });

}


export function useUser(userId: string) {
    const user = useQuery<GetUserResponse>(['users', userId], () => getUser(userId), {
        staleTime: 1000 * 60 * 10 // durante 10 minutos a query torna-se obsoleta
    });
    return user
}