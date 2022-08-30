import { Box, Button, Container, Divider, Flex, HStack, Image, Stack, Text, useBreakpointValue, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import Head from 'next/head'
import { EmailInput } from "../components/SingIn/EmailInput";
import { PasswordInput } from "../components/SingIn/PasswordInput";


const SingIn: NextPage = () => {


    const isMobileView = useBreakpointValue({
        base: true,
        lg: false,
    })


    return(
        <>
            <Head>
                <title>Plus | Sing in</title>
                <meta name="Plus" content="Adicionando lucro a sua vida" />

                {/* Favicon */}
                <link rel="Plus" href="/favicon.ico" type="image/x-icon" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>

            <HStack justify="space-between" bgColor="brand.white-900" h="100vh">
                <Container >
                    <VStack h="100%" color="brand.black-700" justify="center" >
                            <Image src="/images/Logo_Slogan.png" alt="Plus - Adicionando lucro a sua vida" />
                            <Text fontWeight="medium" fontSize="lg" py={6}>
                                Faça login na sua conta PLUS, com email:
                            </Text>
                            <EmailInput />
                            <PasswordInput />
                            <Button w="100%" colorScheme="whatsapp" color="brand.white-900">
                                <Text fontWeight="medium" fontSize="lg">
                                    Login
                                </Text>
                            </Button>

                                <Divider orientation='horizontal' />
                                <Text py={6} fontWeight="medium" fontSize="lg">ou</Text>
                                <Divider orientation='horizontal' />

                            <Button w="100%" colorScheme="red" color="brand.white-900">
                                <Text fontWeight="medium" fontSize="lg">
                                    Google
                                </Text>
                            </Button>

                    </VStack>
                </Container>

                {!isMobileView && (
                    <Image flex="1" h="100%" src="/images/Banner.png" alt="Adicione lucro a sua vida" />
                )}
            </HStack>

        </>
    )
}

export default SingIn