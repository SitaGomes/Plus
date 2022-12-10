import { Avatar, Box,  Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, HStack, Icon, IconButton, Image, Text, VStack } from "@chakra-ui/react";
import { MenuCard } from "./MenuCard";

import {RiMenuLine} from "react-icons/ri"
import { useState } from "react";


interface IMobileMenu {
    userName: string;
    userEmail: string;
    path: string;
}



export function MobileMenu({userName, userEmail, path}: IMobileMenu){

    const [isMenuOpen, setOpenMenu] = useState(false)

    const toggleMenu = () => {
        setOpenMenu(!isMenuOpen)
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

                        <DrawerBody>
                            <VStack>
                                <Box>
                                    <Avatar
                                        borderRadius='full'
                                        boxSize='80px'
                                        name={userName}
                                    />
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
                        </DrawerBody>
                        
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}