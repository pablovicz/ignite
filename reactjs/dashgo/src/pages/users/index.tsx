import { useState } from 'react';
import {
    Link as ChakraLink,
    Box, Flex, Button, Icon, Table, Thead, Spinner, HStack, Progress, Stack,
    Tr, Th, Td, Checkbox, Tbody, Text, useBreakpointValue, IconButton
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine, RiRefreshLine } from "react-icons/ri";
import Link from 'next/link';

import { Header } from "../../components/Header";
import { Heading } from "../../components/Heading";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useUsers } from "../../services/hooks/useUsers";
import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';


export default function UserList() {

    const [page, setPage] = useState(1);
    const { data, isLoading, isFetching, error, refetch } = useUsers(page);

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    });

    async function handlePrefetchUser(userId: string) {
        await queryClient.prefetchQuery(['user', userId], async () => {
            const response = await api.get(`/users/${userId}`)

            return response.data;
        }, {
            staleTime: 1000 * 60 * 10 //10 minutos
        })
    }


    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Stack spacing="1" mb="8">
                        <Flex mb="4" justifyContent="space-between" align="center">
                            <Heading>Usuários</Heading>
                            <HStack spacing="2">
                                <Button
                                    as="a"
                                    size="sm"
                                    fontSize="sm"
                                    colorScheme="purple"
                                    cursor="pointer"
                                    leftIcon={<Icon as={RiRefreshLine} fontSize="20" />}
                                    onClick={() => refetch()}
                                    disabled={isFetching}
                                >
                                    Refreash
                                </Button>
                                <Link href="/users/create" passHref>
                                    <Button
                                        as="a"
                                        size="sm"
                                        fontSize="sm"
                                        colorScheme="pink"
                                        cursor="pointer"
                                        leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                                    >
                                        Criar Novo
                                    </Button>
                                </Link>
                            </HStack>
                        </Flex>
                        {!isLoading && isFetching &&
                            <Progress size='xs' isIndeterminate colorScheme="pink" bg="gray.800" />
                        }
                    </Stack>


                    {isLoading ? (
                        <Flex justifyContent="center" align="center">
                            <Spinner />
                        </Flex>
                    ) : error ? (
                        <Flex justifyContent="center" align="center">
                            <Text>Falha ao obter dados dos usuários</Text>
                        </Flex>
                    ) : (
                        <>
                            <Table colorScheme="whiteAlpha">
                                <Thead>
                                    <Tr>
                                        <Th px={["4", "4", "6"]} color="gray.300" width="8">
                                            <Checkbox colorScheme="pink" />
                                        </Th>
                                        <Th>Usuário</Th>
                                        {isWideVersion && <Th>Data de cadastro</Th>}
                                        <Th></Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.users.map(user => (
                                        <Tr key={user.id}>
                                            <Td px={["4", "4", "6"]}>
                                                <Checkbox colorScheme="pink" />
                                            </Td>
                                            <Td>
                                                <Box>
                                                    <ChakraLink 
                                                        color="purple.400"
                                                        onMouseEnter={() => handlePrefetchUser(user.id)}
                                                    >
                                                        <Text fontWeight="bold">{user.name}</Text>
                                                    </ChakraLink>
                                                    <Text fontWeight="small" color="gray.300">{user.email}</Text>
                                                </Box>
                                            </Td>
                                            {isWideVersion && <Td>{user.createdAt}</Td>}
                                            <Td>
                                                <IconButton
                                                    aria-label="Open navigation"
                                                    icon={<Icon as={RiPencilLine} />}
                                                    fontSize="24"
                                                    colorScheme="gray.300"
                                                    variant="unstyled"
                                                    _hover={{ color: "purple" }}
                                                    onClick={() => { }}
                                                    mr="2"
                                                />
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                            <Pagination
                                totalCountOfRegisters={data.totalCount}
                                currentPage={page}
                                onPageChange={setPage}
                            />
                        </>
                    )}
                </Box>
            </Flex>

        </Box>
    );
}