import { Avatar, Box, Container, HStack, Image, Text, VStack, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";
import { MenuCard } from "./MenuCard";

interface IDesktopMenu {
    userName: string;
    userEmail: string ;
    path: string;
}


export function DesktopMenu({userName, userEmail, path}: IDesktopMenu){

    return(
        <Box w="100vw" bgColor="brand.white-900" borderBottomRadius="50px">
            <Container maxW="1100px">
                <HStack justify="space-between" py={4}>
                    <HStack >
                        <Image src="/images/logo.png" alt="Plus logo" mr={4}/>

                        <HStack >
                            {path === "/dashboard" 
                                ? (
                                    <MenuCard href={"/dashboard"} active>
                                        Dashboard
                                    </MenuCard>
                                )
                                : (
                                    <MenuCard href={"/dashboard"}>
                                        Dashboard
                                    </MenuCard>
                                )
                            }
                            {path === "/stats" 
                                ? (
                                    <MenuCard href={"/stats"} active>
                                        Estatisticas
                                    </MenuCard>
                                )
                                : (
                                    <MenuCard href={"/stats"}>
                                        Estatisticas
                                    </MenuCard>
                                )
                            }
                        </HStack>

                    </HStack>
                    <HStack>
                        <VStack align="flex-end" justify="center" spacing={0} pr={3}>
                            <Text fontWeight="medium">{userName}</Text>
                            <Text fontSize="sm">{userEmail}</Text>
                        </VStack>
                        <Box>
                            <Link href="/user">
                                <ChakraLink >
                                    <Avatar
                                        borderRadius='full'
                                        boxSize='80px'
                                        name={userName}
                                    />
                                </ChakraLink>
                            </Link>
                        </Box>
                    </HStack>
                </HStack>
            </Container>
        </Box>
    )
}