import { NextApiRequest, NextApiResponse } from 'next';

//// Estratégias de Autenticação
// JWT - token de autenticação com um storage qualquer 
// Next Auth (Social - Github, facebook, google) - não há preocupação de ficar se preocupando com informaçòes do usuário
// Servicos Externos - Cognito (AWS), Auth0 - Authentication as Service

export default (request: NextApiRequest, response: NextApiResponse) => {

    const users = [
        { id: 1, name: 'Pablo' },
        { id: 2, name: 'Diego' },
        { id: 3, name: 'Kao' }
    ]

    return response.json(users);
}


// api hooks -> Serverless
// 