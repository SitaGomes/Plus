import { Avatar, Box, Button, Container, Flex, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import { useLocalAuth } from "../hooks/useLocalAuth";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

import { toast, ToastContainer } from "react-toastify";
import {AiFillPlusCircle, AiFillDelete, AiFillEdit} from "react-icons/ai"

import { IUser } from "../context/authContext";
import { Menu } from "../components/Menu";
import { Input } from "../components/SingIn/Input";

import * as yup from "yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface IUserPage {
    userData: {
        id: string | null
        name: string | null,
        email: string | null,
        photo_url: string | null,
    }
}

interface IUpdate {
    name: string,
    password: string
}

const updatesSchema = yup.object().shape({
    name: yup.string(),
    password: yup.string(),
})


const UserPage: NextPage<IUserPage> = ({userData}: IUserPage) => {
 
    const supabase = useSupabaseClient()
    const [hydrated, setHydrated] = useState(false)
    const {handleSetUser, user} = useLocalAuth()

    const {register, handleSubmit, formState, resetField} = useForm<IUpdate>({resolver: yupResolver(updatesSchema)})

    useEffect(() => {
        setHydrated(true)
    }, [setHydrated])


    if(!hydrated) {
        return null
    }

    const handleSetNewProfilePic: React.ChangeEventHandler<HTMLInputElement> = async (event) => {

        try {
    
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.')
            }
        
            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${userData.id}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, { upsert: true })
        
            if (uploadError) {
                toast.error("Erro ao atualizar a foto de perfil!", {
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

            const { data } = supabase
                .storage
                .from('avatars')
                .getPublicUrl(filePath)

            handleSetUser({...user, photo_url: data.publicUrl})

            await supabase
                .from("users")
                .update({photo_url: data.publicUrl})
                .eq("id", user.id) 

            toast.success("Foto de usuário mudada com sucesso!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

        
            
        } catch (error) {
            toast.error("Erro ao atualizar a foto de perfil!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    // const handleUpdateProfile = async () => {
         
    //     try {
    //       if (!user) throw new Error('No user')
    
    //       const updates: IUser = {
    //         email
    //       }
    
    //       let { error } = await supabase.from('profiles').upsert(updates)
    //       if (error) throw error
    //       alert('Profile updated!')
    //     } catch (error) {
    //       alert('Error updating the data!')
    //       console.log(error)
    //     }
    // }

    const handleUpdateProfile: SubmitHandler<IUpdate> = async ({name, password}) => {

        if(name?.trim() === "" && password?.trim() === "") {
            toast.error("Preencha no minimo 1 campo para atualizar.", {
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


        if(name?.trim().length > 1 && name?.trim().length < 3) {
            toast.error("Nome do usuário deve ter mais de 3 caracteres.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }

        if(password?.trim().length > 1 && password?.trim().length < 6) {
            toast.error("Senha deve ter mais de 6 caracteres.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }



        let updates: {name: string | null, password?: string | null} = {
            name: name ? name : user.name,
            password: password,
        }

        if(!password) {
            updates = {
                name: name ? name : user.name,
            }
        }

        const { error } = await supabase
            .from('users')
            .update(updates)
            .eq("id", user.id)

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

        toast.success("Informações atualizadas", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });

        handleSetUser({...user, ...updates})

        resetField("name")
        resetField("password")
    }

    return(
        <>
            <Head>
                <title>Plus | Usuário</title>
                <meta name="Plus" content="Melhore seu gerenciamento financeiro" />

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

            <Menu />

            <Container maxW="1100px" display="flex" flexDir="column" alignItems="center" mt={5}>

                <Avatar
                    borderRadius='full'
                    boxSize='200px'
                    src={user.photo_url ? user.photo_url : "unknown"}
                    name={user.name ? user.name : "unknown"}
                    mb={5}
                />
                <VStack w="100%" gap={5} mb={5}>
                    <Input 
                        textAlign="center"
                        label="Foto de perfil"
                        name="file"
                        type="file"
                        bg="whiteAlpha.50"
                        onChange={handleSetNewProfilePic}
                    />
                </VStack>

                <VStack as={"form"} onSubmit={handleSubmit(handleUpdateProfile)} w="100%" gap={5} mb={5}>

                    <Input
                        label="Email"
                        name="email"
                        placeholder={user.email ? user.email : "email"}
                        isDisabled
                        bg="whiteAlpha.900"
                    />
                    
                    <Input
                        {...register("name")}
                        label="Nome"
                        name="name"
                        placeholder={user.name ? user.name : "nome"}
                        bg="whiteAlpha.800"
                    />
                    
                    <Input
                        {...register("password")}
                        label="Senha"
                        password
                        name="password"
                        placeholder="123456"
                        bg="whiteAlpha.800"
                    />

                    <Button type="submit" colorScheme="green">
                        Atualizar perfil
                    </Button>

                </VStack>


                <Box w="100%" mb={10}>

                    <Flex justifyContent="space-between" alignItems="center">
                        <Text fontSize="lg" fontWeight="bold">
                            Categorias de Despesa
                        </Text>
                        <Button bg="transparent">
                            <AiFillPlusCircle size="30px"/>
                        </Button>
                    </Flex>
                    <TableContainer bgColor="brand.white-900" borderRadius="20px" p={3}>
                        <Table variant='simple' size="lg" >
                            <Thead>
                                <Tr>
                                    <Th>Nome</Th>
                                    <Th></Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>

                                <Tr>
                                    <Td>Conta de luz</Td>
                                    <Td>
                                        <Button bg="transparent">
                                            <AiFillEdit size="20px"/>
                                        </Button>
                                    </Td>
                                    <Td>
                                        <Button bg="transparent">
                                            <AiFillDelete size="20px"/>
                                        </Button>
                                    </Td>
                                </Tr>
                                        
                            </Tbody>
                        </Table>
                    </TableContainer>

                </Box>


                <Box w="100%">

                    <Flex justifyContent="space-between" alignItems="center">
                        <Text fontSize="lg" fontWeight="bold">
                            Categorias de Receita
                        </Text>
                        <Button bg="transparent">
                            <AiFillPlusCircle size="30px"/>
                        </Button>
                    </Flex>
                    <TableContainer bgColor="brand.white-900" borderRadius="20px" p={3}>
                        <Table variant='simple' size="lg" >
                            <Thead>
                                <Tr>
                                    <Th>Nome</Th>
                                    <Th></Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody>

                                <Tr>
                                    <Td>Conta de luz</Td>
                                    <Td>
                                        <Button bg="transparent">
                                            <AiFillEdit size="20px"/>
                                        </Button>
                                    </Td>
                                    <Td>
                                        <Button bg="transparent">
                                            <AiFillDelete size="20px"/>
                                        </Button>
                                    </Td>
                                </Tr>
                                        
                            </Tbody>
                        </Table>
                    </TableContainer>

                </Box>

            </Container>
        
        </>
    )
}

export default UserPage

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient(ctx)
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession()

  
    if (!session)
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
  
    // Run queries with RLS on the server
    const { data } = await supabase
        .from('users')
        .select('name, email, photo_url')
        .eq("id", session.user.id)
  
    return {
      props: {
        initialSession: session,
        userData: {
            id: session.user.id,
            name: data?.[0].name,
            email: data?.[0].email,
            photo_url: data?.[0].photo_url,
        },
      },
    }
}