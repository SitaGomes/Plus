import { Box,  Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, HStack, Icon, IconButton, Image, Text, VStack } from "@chakra-ui/react";
import { MenuCard } from "./MenuCard";

import {RiMenuLine} from "react-icons/ri"
import { useState } from "react";
export function MobileMenu(){

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
                                    <Image
                                        borderRadius='full'
                                        boxSize='80px'
                                        src='https://bit.ly/dan-abramov'
                                        alt='Jão pessoa'
                                    />
                                </Box>

                                <VStack align="center" justify="center">
                                    <Text fontWeight="medium">Jão pessoa</Text>
                                    <Text fontSize="sm">Joaopessoa@gmail.com</Text>
                                </VStack>

                            </VStack>

                            <VStack mt={10} gap={10}>
                                    <MenuCard active>
                                        Dashboard
                                    </MenuCard>
                                    <MenuCard>
                                        Estatísca
                                    </MenuCard>
                                    <MenuCard>
                                        Orçamento
                                    </MenuCard>
                                </VStack>
                        </DrawerBody>
                        
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        </>
    )
}