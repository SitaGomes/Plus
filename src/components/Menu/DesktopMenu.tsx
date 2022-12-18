import { Avatar, Box, Container, HStack, Image, Text, VStack, Link as ChakraLink, Popover, PopoverTrigger, Button, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody } from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import { MenuCard } from "./MenuCard";
import Router from "next/router";
import { useLocalAuth } from "../../hooks/useLocalAuth";

interface IDesktopMenu {
    userName: string;
    userEmail: string;
    userPhotoUrl: string;
    path: string;
}


export function DesktopMenu({userName, userEmail, userPhotoUrl, path}: IDesktopMenu){

    const supabase = useSupabaseClient()

    const handleUserLogout = async () => {
        const { error } = await supabase.auth.signOut()

        if(error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }

        Router.push("/")
    }

    return(
        <Box w="100vw" bgColor="brand.white-900" borderBottomRadius="50px">
            <Container maxW="1100px">
                <HStack justify="space-between" py={4}>
                    <HStack >
                        <Image src={"/images/logo.png"} alt="Plus logo" mr={4}/>

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

                    <Popover>
                        <PopoverTrigger>
                            <Button h="100%" borderRadius={"20px"} bg="brand.white-900" p={4}> 
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
                                                    src={userPhotoUrl}
                                                    name={userName}
                                                />
                                            </ChakraLink>
                                        </Link>
                                    </Box>
                                </HStack>

                            </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <PopoverArrow />
                            <PopoverBody display={"flex"} justifyContent="center">
                                <Button onClick={handleUserLogout} colorScheme="red">Sair</Button>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                    
                </HStack>
            </Container>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </Box>
    )
}