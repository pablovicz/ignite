import { Box, Flex, Divider, VStack, SimpleGrid, HStack, Button } from "@chakra-ui/react";
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Heading } from "../../components/Heading";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

//bibliotecas para formularios complexos
// 1`- Formik
// 2 - React Hook Form -> mais recomendada
// 3 - Unform -> criada pela rocket, recomendada para forms que necessitam de um cuidado maior com performance


type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}


const createUserFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
    password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
    password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
})


export default function CreateUser() {

    const router = useRouter();

    const createUser = useMutation(async (user: CreateUserFormData) => {
        const response = await api.post('users', {
            user: {
                ...user,
                created_at: new Date(),
            }
        })
        return response.data.user;
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        }
    })

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(createUserFormSchema)
    });


    const handleUserCreate: SubmitHandler<CreateUserFormData> = async (values, event) => {
        event.preventDefault();
        await createUser.mutateAsync(values);
        router.push('/users')
        
    }


    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Box
                    as="form"
                    flex="1"
                    borderRadius={8}
                    bg="gray.800"
                    p={["6", "8"]}
                    noValidate
                    onSubmit={handleSubmit(handleUserCreate)}
                >
                    <Heading>Criar Usuário</Heading>
                    <Divider my="6" borderColor="gray.700" />
                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                            <Input
                                name="name"
                                label="Nome Completo"
                                error={formState.errors.name}
                                {...register('name')}
                            />
                            <Input
                                name="email"
                                type="email"
                                label="E-mail"
                                error={formState.errors.email}
                                {...register('email')}
                            />
                        </SimpleGrid>
                        <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                            <Input
                                name="password"
                                type="password"
                                label="Senha"
                                error={formState.errors.password}
                                {...register('password')}
                            />
                            <Input
                                name="password_confirmation"
                                type="password"
                                label="Confirmação da Senha"
                                error={formState.errors.password_confirmation}
                                {...register('password_confirmation')}
                            />
                        </SimpleGrid>
                    </VStack>
                    <Flex mt="8" justifyContent="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button colorScheme="whiteAlpha">Cancelar</Button>
                            </Link>
                            <Button
                                colorScheme="pink"
                                type="submit"
                                isLoading={formState.isSubmitting}
                            >
                                Salvar
                            </Button>
                        </HStack>

                    </Flex>

                </Box>
            </Flex>

        </Box>
    );
}