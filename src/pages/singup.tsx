import { NextPage } from "next";
import NextLink from "next/link";
import Head from 'next/head'
import  Router from "next/router";

import { ToastContainer, toast } from 'react-toastify';

import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Button, Container, Link, HStack, Image, Text, useBreakpointValue, VStack, } from "@chakra-ui/react";

import { Input } from "../components/SingIn/Input";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";

interface ISingUp {
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
}
  
const singUpSchema = yup.object().shape({
    name: yup.string().required("Nome de usuário obrigatório").min(3),
    email: yup.string().required("E-mail Obrigatório").email("E-mail inválido"),
    password: yup.string().required("Senha Obrigatória").min(6),
    password_confirmation: yup.string().oneOf([
        null, yup.ref("password")
    ], "As senhas precisam ser iguais"),
})


const SingUp: NextPage = () => {

    const supabase = useSupabaseClient()

    const {register, handleSubmit, formState} = useForm<ISingUp>({resolver: yupResolver(singUpSchema)})  
    const {errors} = formState

    const handleSingUp: SubmitHandler<ISingUp> = async ({email, password, name}) => {
        try {

            // const {user} = await createUserWithEmailAndPassword(auth, email, password)
            
            // await updateProfile(user, {
            //     displayName: name
            // }) 
            
            // console.log(user)
            // toast.success("Conta plus criada com sucesso!")

            // Router.push("/")
            
            const {data, error} = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        name: name,
                        email: email,
                        password: password
                    }
                }
            })

            toast.info('Confirme o seu email pelo link enviado', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        } catch(err) {
            // const error = err as Error

            // if(error.message === "Firebase: Error (auth/email-already-in-use).") {
            //     return toast.error("Este usuário já existe")
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

                        <VStack gap={3} maxW="350px" w="100%" as="form" onSubmit={handleSubmit(handleSingUp)}>

                            <Input
                                {...register("name")}
                                name="name"
                                type="text"
                                label="Nome de usuário"
                                error={errors.name}
                            />
                            
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


                            <Button w="100%" bg="brand.green-500" _hover={{bg: "#21AD7C"}} color="brand.white-900" type="submit">
                                <Text fontWeight="medium" fontSize="lg">
                                    Criar conta
                                </Text>
                            </Button>

                        </VStack>


                        <NextLink href="/">
                            <Link color="brand.orange-500" fontSize="sm">
                                Ja tem uma conta? Entre.
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