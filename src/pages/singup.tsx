import { NextPage } from "next";
import NextLink from "next/link";
import Head from 'next/head'

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Button, Container, Link, HStack, Image, Text, useBreakpointValue, VStack, FormControl, } from "@chakra-ui/react";

import { Input } from "../components/SingIn/Input";

interface ISingIn {
    email: string,
    password: string,
    password_confirmation: string,
}
  
const singInSchema = yup.object().shape({
    email: yup.string().required("E-mail Obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha Obrigatória").min(6),
    password_confirmation: yup.string().oneOf([
        null, yup.ref("password")
    ], "As senhas precisam ser iguais"),
})


const SingUp: NextPage = () => {


    const isMobileView = useBreakpointValue({
        base: true,
        lg: false,
    })


    const {register, handleSubmit, formState} = useForm<ISingIn>({resolver: yupResolver(singInSchema)})  
    const {errors} = formState

    const handleSingIn: SubmitHandler<ISingIn> = async ({email, password}) => {
        try {

            const user = await createUserWithEmailAndPassword(auth, email, password)

            console.log(user)
        } catch(err) {
            console.log(err)
        }

    }



    return(
        <>
            <Head>
                <title>Plus | Sing up</title>
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
                    <VStack
                      h="100%"
                      color="brand.black-700"
                      justify="center"
                      >
                        <Image src="/images/Logo_Slogan.png" alt="Plus - Adicionando lucro a sua vida" />
                        <Text fontWeight="medium" fontSize="lg" py={6}>
                            Crie uma conta PLUS.
                        </Text>

                        <VStack gap={3} w="100%" as="form" onSubmit={handleSubmit(handleSingIn)}>

                            <Input
                                {...register("email")}
                                name="email"
                                type="email"
                                label="Email"
                                error={errors.email}
                            />

                            <Input
                                {...register("password")}
                                password
                                name="password"
                                label="Senha"
                                error={errors.password}
                            />

                            <Input
                                {...register("password_confirmation")}
                                password
                                name="password_confirmation"
                                label="Confirmação da Senha"
                                error={errors.password_confirmation} 
                            />


                            <Button w="100%" colorScheme="whatsapp" color="brand.white-900" type="submit">
                                <Text fontWeight="medium" fontSize="lg">
                                    Criar conta
                                </Text>
                            </Button>

                        </VStack>


                        <NextLink href="/">
                            <Link color="brand.orange-500" fontSize="sm">
                                Entre na sua conta PLUS
                            </Link>
                        </NextLink>

                    </VStack>
                </Container>

                {!isMobileView && (
                    <Image flex="1" h="100%" src="/images/Banner.png" alt="Adicione lucro a sua vida" />
                )}
            </HStack>

        </>
    )
}

export default SingUp