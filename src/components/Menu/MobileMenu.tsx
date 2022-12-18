import { Link as ChakraLink, Avatar, Box,  Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, HStack, Icon, IconButton, Image, Text, VStack, Button } from "@chakra-ui/react";
import { MenuCard } from "./MenuCard";

import {RiMenuLine} from "react-icons/ri"
import { useState } from "react";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-toastify";
import Router from "next/router";
import { useLocalAuth } from "../../hooks/useLocalAuth";


interface IMobileMenu {
    userName: string;
    userEmail: string;
    userPhotoUrl: string;
    path: string;
}



export function MobileMenu({userName, userEmail, userPhotoUrl, path}: IMobileMenu){

    const [isMenuOpen, setOpenMenu] = useState(false)
    const supabase = useSupabaseClient()


    const toggleMenu = () => {
        setOpenMenu(!isMenuOpen)
    }

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
        <>
            <Box w="100vw" bgColor="brand.white-900" borderBottomRadius="50px" px={[6, 10]}>
                <HStack justify="space-between" py={5} flexWrap="wrap">
                    <Image src="/images/logo.png" alt="Plus logo" mr={4}/>
                    <IconButton
                        icon={<Icon as={RiMenuLine} fontSize="36" />}
                        aria-label="Abrir Menu"
                        onClick={() => toggleMenu()}
                        variant="unstyled"
                        mr="2"
                        pt="1"
                    />
                </HStack>
            </Box>
        

            <Drawer placement="right" isOpen={isMenuOpen} onClose={() => toggleMenu()}>
                <DrawerOverlay>
                    <DrawerContent  bg="brand.white-900" color="brand.black-700" p="4">
                        <DrawerCloseButton mr="80%"/>

                        <DrawerBody display="flex" flexDirection="column" justifyContent="space-between">
                            <Box>

                                <VStack>
                                    <Box>
                                        <Link href="/user">
                                            <ChakraLink>

                                                <Avatar
                                                    borderRadius='full'
                                                    boxSize='80px'
                                                    src={userPhotoUrl}
                                                    name={userName}
                                                />

                                            </ChakraLink>

                                        </Link>
                                    </Box>

                                    <VStack align="center" justify="center">
                                        <Text fontWeight="medium">{userName}</Text>
                                        <Text fontSize="sm">{userEmail}</Text>
                                    </VStack>

                                </VStack>

                                <VStack mt={10} gap={10}>
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
                                </VStack>
                            </Box>
                            <Button mt={10} onClick={handleUserLogout} colorScheme="red">
                                Sair
                            </Button>
                        </DrawerBody>
                        
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}