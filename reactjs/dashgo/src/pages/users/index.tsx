import {
    Box, Flex, Button, Icon, Table, Thead,
    Tr, Th, Td, Checkbox, Tbody, Text, useBreakpointValue, IconButton
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import Link from 'next/link';

import { Header } from "../../components/Header";
import { Heading } from "../../components/Heading";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";


export default function UserList() {

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    });


    return (
        <Box>
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justifyContent="space-between" align="center">
                        <Heading>Usuários</Heading>
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
                    </Flex>
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
                            <Tr>
                                <Td px={["4", "4", "6"]}>
                                    <Checkbox colorScheme="pink" />
                                </Td>
                                <Td>
                                    <Box>
                                        <Text fontWeight="bold">Pablo Woinarovicz</Text>
                                        <Text fontWeight="small" color="gray.300">pablo_woinarovicz@outlook.com</Text>
                                    </Box>
                                </Td>
                                {isWideVersion && <Td>04 de Abril, 2021</Td>}
                                <Td>
                                    <IconButton
                                        aria-label="Opoen navigation"
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
                        </Tbody>
                    </Table>
                    <Pagination />
                </Box>
            </Flex>

        </Box>
    );
}