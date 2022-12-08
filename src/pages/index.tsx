import { NextPage } from "next";
import NextLink from "next/link";
import Head from 'next/head'
import { signIn, useSession } from "next-auth/react"
import Router from "next/router";

import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase"

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import toast from "react-hot-toast";

import {  Button, Container, Divider, Link, HStack, Image, Text, useBreakpointValue, VStack, } from "@chakra-ui/react";
import { Input } from "../components/SingIn/Input";
import { Toaster } from "../components/Toaster";
import { useLocalAuth } from "../hooks/useLocalAuth";

interface ISingIn {
    email: string,
    password: string,
}


const singInSchema = yup.object().shape({
    email: yup.string().required("E-mail Obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha Obrigatória").min(6),
})

const SingIn: NextPage = () => {

    
    const {data: session, status} = useSession()
    const {handleSetUser} = useLocalAuth()

    const {register, handleSubmit, formState} = useForm<ISingIn>({resolver: yupResolver(singInSchema)})
    const {errors} = formState

    const handleEmailSingIn: SubmitHandler<ISingIn> = async ({email, password}) => {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            
            const {currentUser} = auth
            
            if(currentUser) {

                handleSetUser({
                    name: currentUser.displayName,
                    email: currentUser.email,
                })
            }

            toast.success("Login feito com sucesso!")
            Router.push("/dashboard")
            
        } catch(err) {
            const error = err as Error

            if (error.message === "Firebase: Error (auth/wrong-password)."){
                return toast.error("Senha errada")
            }

            if (error.message === "Firebase: Error (auth/user-not-found).") {
                return toast.error("Usuário não existe")
            }

            toast.error(error.message)
        }

    }

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
            <Toaster />

            <HStack justify="space-between" bgColor="brand.white-900" h="100vh">
                <Container >
                    <VStack h="100%" color="brand.black-700" justify="center">
                        <Image src="/images/Logo_Slogan.png" alt="Plus - Adicionando lucro a sua vida" />
                        <Text fontWeight="medium" fontSize="lg" py={6}>
                            Faça login na sua conta PLUS, com email:
                        </Text>

                        <VStack as="form" gap={3} w="100%" onSubmit={handleSubmit(handleEmailSingIn)}>

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

                            <Button w="100%" colorScheme="whatsapp" color="brand.white-900" type="submit">
                                <Text fontWeight="medium" fontSize="lg">
                                    Login
                                </Text>
                            </Button>
                        </VStack>

                        <NextLink href="/singup">
                            <Link color="brand.orange-500" fontSize="sm">Crie uma conta PLUS</Link>
                        </NextLink>

                    </VStack>
                </Container>

                {!isMobileView && <Image flex="1" h="100%" src="/images/Banner.png" alt="Adicione lucro a sua vida" />}
            </HStack>

        </>
    )
}

export default SingIn