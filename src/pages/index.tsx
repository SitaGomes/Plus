import { NextPage } from "next";
import NextLink from "next/link";
import Head from 'next/head'
import Router from "next/router";

import { useSession, useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { useEffect, useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../utils/firebase"

import { ToastContainer, toast } from 'react-toastify';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import {  Button, Container, Link, HStack, Image, Text, useBreakpointValue, VStack, } from "@chakra-ui/react";
import { Input } from "../components/SingIn/Input";
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

    const session = useSession()
    const supabase = useSupabaseClient()
    const user = useUser()

    const {handleSetUser} = useLocalAuth()

    const {register, handleSubmit, formState} = useForm<ISingIn>({resolver: yupResolver(singInSchema)})
    const {errors} = formState

    const handleEmailSingIn: SubmitHandler<ISingIn> = async ({email, password}) => {
        try {
            // await signInWithEmailAndPassword(auth, email, password)
            
            // const {currentUser} = auth
            
            // if(currentUser) {

            //     handleSetUser({
            //         name: currentUser.displayName,
            //         email: currentUser.email,
            //     })
            // }

            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })

            toast.success("Login feito com sucesso!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            console.log(data)

            

            // Router.push("/dashboard")
            
        } catch(err) {
            // const error = err as Error

            // if (error.message === "Firebase: Error (auth/wrong-password)."){
            //     return toast.error("Senha errada")
            // }

            // if (error.message === "Firebase: Error (auth/user-not-found).") {
            //     return toast.error("Usuário não existe")
            // }

            // toast.error(error.message)
            console.log(err)
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

            <HStack justify="space-between" bgColor="brand.white-900" h="100vh">
                <Container>
                    <VStack h="100%" color="brand.black-700" justify="center">
                        <Image src="/images/Logo_Slogan.png" alt="Plus - Adicionando lucro a sua vida" />
                        <Text fontWeight="medium" fontSize="lg" py={6}>
                            Entre na sua conta PLUS:
                        </Text>

                        <VStack as="form" gap={3} maxW="350px" w="100%" onSubmit={handleSubmit(handleEmailSingIn)}>

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

                            <Button w="100%" bg="brand.green-500" _hover={{bg: "#21AD7C"}} color="brand.white-900" type="submit">
                                <Text fontWeight="medium" fontSize="lg">
                                    Login
                                </Text>
                            </Button>

                        </VStack>

                        <NextLink href="/singup">
                            <Link color="brand.orange-500" fontSize="sm">
                                Não tem uma conta? Crie uma de graça.
                            </Link>
                        </NextLink>

                    </VStack>
                </Container>

                {!isMobileView && <Image flex="1" h="100%" src="/images/Banner.png" alt="Adicione lucro a sua vida" />}
            </HStack>

        </>
    )
}

export default SingIn