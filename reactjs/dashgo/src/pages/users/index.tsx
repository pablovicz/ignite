import {
    useBreakpointValue, Box, Flex, Heading, Button, Text,
    Icon, Table, Thead, Tr, Th, Td, Checkbox, Tbody, IconButton
} from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import Link from 'next/link';

import { Pagination } from '../../components/Form/Pagination';
import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

export default function UserList() {

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">Usuários</Heading>
                        <Link href="/users/create" passHref>
                            <Button
                                as="a"
                                size="sm"
                                fontSize="sm"
                                colorScheme="pink"
                                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                            >
                                Criar novo
                            </Button>
                        </Link>
                    </Flex>
                    <Table colorScheme="whiteAlpha">
                        <Thead>
                            <Tr>
                                <Th px={["4", "4", "6"]} color="gray.300" width="8">
                                    <Checkbox colorScheme="pink" />
                                </Th>
                                <Th>Usuário</Th>
                                {isWideVersion && (<Th>Data de cadastro</Th>)}
                                <Th width="8"></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td px={["4", "4", "6"]}>
                                    <Checkbox colorScheme="pink" />
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Pablo Woinarovicz</Text>
                                        <Text fontSize="sm" color="gray.300">pablowoina2205@gmail.com</Text>
                                    </Box>
                                </Td>
                                {isWideVersion && (<Td>04 de Abril, 2021</Td>)}
                                <Td>
                                    <IconButton
                                        aria-label="Open navigation"
                                        icon={<Icon as={RiPencilLine} />}
                                        fontSize="20"
                                        variant="unstyled"
                                        size="md"
                                        color="purple"
                                        onClick={() => { }}
                                    ></IconButton>
                                </Td>
                            </Tr>

                        </Tbody>
                    </Table>
                    <Pagination />
                </Box>
            </Flex>

        </Box>
    );
}