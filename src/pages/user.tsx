import { Avatar, Box, Button, Container, Flex, Heading, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Menu } from "../components/Menu";
import { Input } from "../components/SingIn/Input";
import { useLocalAuth } from "../hooks/useLocalAuth";

import {AiFillPlusCircle, AiFillDelete, AiFillEdit} from "react-icons/ai"


const User: NextPage = () => {

    const {user} = useLocalAuth()

    const [hydrated, setHydrated] = useState(false)

    useEffect(() => {
        setHydrated(true)
    }, [setHydrated])

    if(!hydrated) {
        return null
    }

    return(
        <>
            <Head>
                <title>Plus | Usuário</title>
                <meta name="Plus" content="Melhore seu gerenciamento financeiro" />

                {/* Favicon */}
                <link rel="Plus" href="/favicon.ico" type="image/x-icon" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>

            <Menu />

            <Container maxW="1100px" display="flex" flexDir="column" alignItems="center" mt={5}>

                <Avatar
                    borderRadius='full'
                    boxSize='200px'
                    src={user.photo_url ? user.photo_url : ""}
                    name={user.name ? user.name : "unknown"}
                    mb={5}
                />

                <VStack w="100%" gap={5} mb={5}>

                    <Input 
                        textAlign="center"
                        label="Foto de perfil"
                        name="file"
                        type="file"
                        bg="whiteAlpha.50"
                    />

                    <Input
                        label="Email"
                        name="email"
                        placeholder={user.email ? user.email : "email"}
                        isDisabled
                        bg="whiteAlpha.900"
                    />
                    
                    <Input
                        label="Nome"
                        name="name"
                        placeholder={user.name ? user.name : "nome"}
                        bg="whiteAlpha.800"
                    />
                    
                    <Input
                        label="Senha"
                        password
                        name="password"
                        placeholder="123456"
                        bg="whiteAlpha.800"
                    />

                    <Button colorScheme="green">
                        Atualizar
                    </Button>

                </VStack>


                <Box w="100%" mb={10}>

                    <Flex justifyContent="space-between" alignItems="center">
                        <Text fontSize="lg" fontWeight="bold">
                            Categorias de Despesa
                        </Text>
                        <Button bg="transparent">
                            <AiFillPlusCircle size="30px"/>
                        </Button>
                    </Flex>
                    <TableContainer bgColor="brand.white-900" borderRadius="20px" p={3}>
                        <Table variant='simple' size="lg" >
                            <Thead>
                                <Tr>
                                    <Th>Nome</Th>
                                    <Th></Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>

                                <Tr>
                                    <Td>Conta de luz</Td>
                                    <Td>
                                        <Button bg="transparent">
                                            <AiFillEdit size="20px"/>
                                        </Button>
                                    </Td>
                                    <Td>
                                        <Button bg="transparent">
                                            <AiFillDelete size="20px"/>
                                        </Button>
                                    </Td>
                                </Tr>
                                        
                            </Tbody>
                        </Table>
                    </TableContainer>

                </Box>


                <Box w="100%">

                    <Flex justifyContent="space-between" alignItems="center">
                        <Text fontSize="lg" fontWeight="bold">
                            Categorias de Receita
                        </Text>
                        <Button bg="transparent">
                            <AiFillPlusCircle size="30px"/>
                        </Button>
                    </Flex>
                    <TableContainer bgColor="brand.white-900" borderRadius="20px" p={3}>
                        <Table variant='simple' size="lg" >
                            <Thead>
                                <Tr>
                                    <Th>Nome</Th>
                                    <Th></Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>

                                <Tr>
                                    <Td>Conta de luz</Td>
                                    <Td>
                                        <Button bg="transparent">
                                            <AiFillEdit size="20px"/>
                                        </Button>
                                    </Td>
                                    <Td>
                                        <Button bg="transparent">
                                            <AiFillDelete size="20px"/>
                                        </Button>
                                    </Td>
                                </Tr>
                                        
                            </Tbody>
                        </Table>
                    </TableContainer>

                </Box>

            </Container>
        
        </>
    )
}


export default User