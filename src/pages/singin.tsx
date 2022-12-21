import { NextPage } from "next";
import NextLink from "next/link";
import Head from 'next/head'
import Router from "next/router";

import { useSupabaseClient } from '@supabase/auth-helpers-react'

import { ToastContainer, toast } from 'react-toastify';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import {  Button, Container, Link, HStack, Image, Text, useBreakpointValue, VStack, } from "@chakra-ui/react";
import { Input } from "../components/Input";
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

    const supabase = useSupabaseClient()

    const {handleSetUser} = useLocalAuth()

    const {register, handleSubmit, formState: {errors}} = useForm<ISingIn>({resolver: yupResolver(singInSchema)})

    const handleEmailSingIn: SubmitHandler<ISingIn> = async ({email, password}) => {
    
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if(error?.message === "Invalid login credentials") {
            toast.error("Senha incorreta!", {
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

        if(data.user) {

            const {data: fecthData, error} = await supabase
                .from("users")
                .select("name, email, photo_url, isactive")
                .eq("id", data.user.id)
            
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
            
            if(!fecthData?.[0].isactive) {
                toast.error("Esta conta foi deletada", {
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

            handleSetUser({
                id: data.user.id,
                email: fecthData?.[0].email,
                name: fecthData?.[0].name,
                photo_url: fecthData?.[0].photo_url
            })
        }

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

        Router.push("/dashboard")

    }

    const isMobileView = useBreakpointValue({
        base: true,
        lg: false,
    })



    return(
        <>
            <Head>
                <title>Plus - Entrar</title>
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
                <Container
                    borderRadius="20px"
                    boxShadow="lg"
                    py={5}
                >
                    <VStack h="100%" color="brand.black-700" justify="center">
                        <Image src="/images/Logo_Slogan.png" alt="Plus - Gestão financeira simplificada" />
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

            </HStack>

        </>
    )
}

export default SingIn