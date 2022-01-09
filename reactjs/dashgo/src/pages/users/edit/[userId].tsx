import { useState, useEffect,FormEvent } from 'react';
import { Box, Flex, Spinner, Divider, VStack, SimpleGrid, HStack, Button, Icon } from "@chakra-ui/react";
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';

import { Input } from "../../../components/Form/Input";
import { Header } from "../../../components/Header";
import { Heading } from "../../../components/Heading";
import { Sidebar } from "../../../components/Sidebar";
import { api } from "../../../services/api";
import { queryClient } from "../../../services/queryClient";
import { useRouter } from "next/router";
import { useUser } from '../../../services/hooks/useUsers';
import { RiEditLine } from 'react-icons/ri';




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
    const { userId } = router.query;

    const { data, isLoading, isFetching, error, refetch } = useUser(String(userId));

    const [loading, setLoading] = useState(isLoading);
    const [editPerfil, setEditPerfil] = useState(false);


    useEffect(() => {
        setLoading(isLoading);
    }, [isLoading]);



    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                {loading ? (
                    <Flex justifyContent="center" align="center" flex="1">
                        <Spinner />
                    </Flex>
                ) : (
                    <Box
                        as="form"
                        flex="1"
                        borderRadius={8}
                        bg="gray.800"
                        p={["6", "8"]}
                        noValidate
                        onSubmit={(values: FormEvent) => console.log(values)}
                    >
                        <Flex justifyContent="space-between" align="center">
                            <Heading>Detalhes do Usuário</Heading>
                            {!editPerfil && (
                                <Button
                                colorScheme="purple"
                                leftIcon={<Icon as={RiEditLine} fontSize="20"/>}
                                onClick={() => setEditPerfil(true)}
                            >
                                Editar
                            </Button>
                            )}
                        </Flex>
                        <Divider my="6" borderColor="gray.700" />
                        <VStack spacing="8">
                            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
                                <Input
                                    name="name"
                                    label="Nome Completo"
                                    placeholder={data.name}
                                    isDisabled={!editPerfil}
                                />
                                <Input
                                    name="email"
                                    type="email"
                                    label="E-mail"
                                    isDisabled={!editPerfil}
                                    placeholder={data.email}
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
                                >
                                    Salvar
                                </Button>
                            </HStack>

                        </Flex>

                    </Box>
                )}

            </Flex>

        </Box>
    );
}