import { Box, Container, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { MenuCard } from "./MenuCard";

export function DesktopMenu(){
    return(
        <Box w="100vw" bgColor="brand.white-900" borderBottomRadius="50px">
            <Container maxW="1100px">
                <HStack justify="space-between" py={4}>
                    <HStack >
                        <Image src="/images/logo.png" alt="Plus logo" mr={4}/>

                        <HStack >
                            <MenuCard active>
                                Dashboard
                            </MenuCard>
                            <MenuCard>
                                Estatísca
                            </MenuCard>
                            <MenuCard>
                                Orçamento
                            </MenuCard>
                        </HStack>

                    </HStack>
                    <HStack>
                        <VStack align="flex-end" justify="center" spacing={0} pr={3}>
                            <Text fontWeight="medium">Jão pessoa</Text>
                            <Text fontSize="sm">Joaopessoa@gmail.com</Text>
                        </VStack>
                        <Box>
                            <Image
                                borderRadius='full'
                                boxSize='80px'
                                src='https://bit.ly/dan-abramov'
                                alt='Jão pessoa'
                            />
                        </Box>
                    </HStack>
                </HStack>
            </Container>
        </Box>
    )
}