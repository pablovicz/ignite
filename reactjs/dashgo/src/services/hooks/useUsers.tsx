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

    return {users, totalCount}
}


export function useUsers(page: number) {

    return useQuery<GetUsersResponse>(['users', page], () => getUsers(page), {
        staleTime: 1000 * 60 * 10 // durante 10 minutos a query torna-se obsoleta
    });

}