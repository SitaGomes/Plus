import { Box, Center, Container, HStack, Image, Text, VStack } from "@chakra-ui/react";

export function Menu(){
    return(
        <Box w="100vw" bgColor="brand.white-900" borderBottomRadius="50px">
            <Container maxW="1100px">
                <HStack justify="space-between" py={4}>
                    <HStack >
                        <Image src="/images/logo.png" alt="Plus logo" mr={4}/>

                        <HStack >
                            <Center w="130px" h="50px" borderRadius="20px" bgColor="brand.white-500">
                                <Text>Dashboard</Text>
                            </Center>
                            <Center w="130px">Estatísca</Center>
                            <Center w="130px">Orçamento</Center>
                        </HStack>

                    </HStack>
                    <HStack>
                        <VStack align="flex-end" justify="center">
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