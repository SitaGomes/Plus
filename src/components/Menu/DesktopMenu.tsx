import { Avatar, Box, Container, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { MenuCard } from "./MenuCard";

interface IDesktopMenu {
    userName: string;
    userEmail: string ;

}


export function DesktopMenu({userName, userEmail}: IDesktopMenu){
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
                            <Text fontWeight="medium">{userName}</Text>
                            <Text fontSize="sm">{userEmail}</Text>
                        </VStack>
                        <Box>
                            <Avatar
                                borderRadius='full'
                                boxSize='80px'
                                name={userName}
                            />
                        </Box>
                    </HStack>
                </HStack>
            </Container>
        </Box>
    )
}