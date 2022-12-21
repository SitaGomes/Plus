import { Box, Button, Container, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react"
import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link";

import {AiFillInstagram, AiFillYoutube} from "react-icons/ai"
import {BsShieldLockFill, BsTwitter} from "react-icons/bs"
import { ColoredButton } from "../components/LandinPage/ColoredButton"


const LandingPage: NextPage = () => {

    return(
        <Box  bg="brand.grey-500">
            <Head>
                <title>Plus - Gerenciamento financeiro</title>
                <meta name="Plus" content="Adicionando lucro a sua vida" />

                {/* Favicon */}
                <link rel="Plus" href="/favicon.ico" type="image/x-icon" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <Container maxW="1200px">
                <Flex
                    justifyContent={["center",
                    "center",
                    "center",
                    "space-between"]}
                    gap={5}
                    p={5}
                    flexWrap="wrap"
                >
                    
                    <Image src="/images/logo-total.png" alt="Plus - gerenciamento financeiro"/>


                    <Flex gap={5}>
                        <Link href={"/singin"}>
                            <Button
                                bg="transparent"
                                color="brand.white-900"
                                transition="200ms ease-in-out"
                                _hover={{bg: "brand.green-500"}}
                            >
                                Entrar
                            </Button>
                        </Link>


                        <ColoredButton href="/singup">
                            Inscrever-se
                        </ColoredButton>
                    </Flex>
                </Flex>
            </Container>

            {/* Hero page */}
            <Flex
                h="90vh"
                justifyContent={["center", "center", "center", "space-around"]}
                alignItems={["","center"]}
                flexWrap="wrap"
                p={4}
                gap={[0, 5, 5, 7]}
            >

                <Flex
                    flexDirection={"column"}
                    color="brand.white-900"
                    gap={5}
                    alignItems={["center", "center", "center", "normal"]}
                >


                    <Heading>
                        Gestão financeira,
                        <br/>
                        simplificada.
                    </Heading>
                    <Text maxW={"400px"}>
                        Acompanhe seu fluxo de caixa sem esforço em uma plataforma amigável para gerenciar suas finanças.
                    </Text>
                    <ColoredButton href="/singup">
                        Inscrever-se
                    </ColoredButton>

                </Flex>

                <Image src={"/images/Hero-banner.svg"} alt="Banner" />

            </Flex>

            <Image pl={["3", "2.5"]} w="100vw"  src="/images/Hero-separator.svg" alt="banner separator" />
        
            <Box bg="brand.white-900" color="brand.grey-500">

                <Container maxW="1200px" textAlign="center" >
                    <Heading pt={10}>
                        Descubra os nossos incríveis recursos
                    </Heading>

                    <Flex flexDirection="column" gap={"200px"} mt={"8em"}>

                        <Flex
                            textAlign={["center", "start"]}
                            alignItems="center"
                            justifyContent={"space-between"}
                            gap={6}
                            flexWrap="wrap"
                        >
                            <Flex flexDirection="column" gap={4}>
                                <Heading maxW={"400px"}>
                                    Interface amigavel.
                                </Heading>
                                <Text maxW={"400px"}>
                                    Acesse sua conta pelo computador, tablet ou telefone, graças a interface simples e responsiva.
                                </Text>
                                <ColoredButton href="/singup">
                                    Inscreva-se
                                </ColoredButton>
                            </Flex>
                            <Image src="/images/Iphone.svg" alt="iphone"/>
                        </Flex>
                    
                        <Flex
                            textAlign={["center", "start"]}
                            alignItems="center"
                            justifyContent={"space-between"}
                            gap={6}
                            flexWrap="wrap"
                            flexDirection="row-reverse"
                        >
                            <Flex flexDirection="column" gap={4}>
                                <Heading maxW={"400px"}>
                                    Faça o seu  orçamento.
                                </Heading>
                                <Text maxW={"400px"}>
                                    Crie categorias ilimitadas para acompanhar o que realmente importa para você.
                                </Text>
                                <ColoredButton href="/singup">
                                    Crie seu orçamento
                                </ColoredButton>
                            </Flex>
                            <Image src="/images/Laptop.svg" alt="iphone"/>
                        </Flex>
                    
                        <Flex
                            textAlign={["center", "start"]}
                            alignItems="center"
                            justifyContent={"space-between"}
                            gap={6}
                            flexWrap="wrap"
                        >
                            <Flex flexDirection="column" gap={4}>
                                <Heading maxW={"400px"}>
                                    Acompanhe sua evolução.
                                </Heading>
                                <Text maxW={"400px"}>
                                    Coloridos (gráficos e tabelas) que tornam divertido ficar obsecado com o seu progresso.
                                </Text>
                                <ColoredButton href="/singup">
                                    Comece sua evolução
                                </ColoredButton>
                            </Flex>
                            <Image src="/images/Laptop-graph.svg" alt="iphone"/>
                        </Flex>      
                    
                    </Flex>
                </Container>

   
                <Box mt={"300px"}>

                    <Image mb="-0.5" w="100%" src="/images/Up-secure.svg" alt="secure" />
                    <Flex
                        flexDirection="column"
                        alignItems="center"
                        bg="brand.green-500"
                        color="brand.white-900"
                        textAlign="center"
                        p={5}
                    >

                        <Icon 
                            as={BsShieldLockFill}
                            boxSize={"60px"}
                        />
                        
                        <Heading>
                            Suas finanças, seguras e protegidas
                        </Heading>

                        <Text>
                            Seus dados estarão criptografados em REST com AES-256 e em trânsito via TLS.
                        </Text>

                    </Flex>
                    <Image mt="-0.5" w="100%"  src="/images/Down-secure.svg" alt="secure" />
                
                </Box>

              
                <Container maxW="1100px" my={"300px"} display="flex" flexDirection="column" alignItems="center">
                    <Heading>
                        Comece a economizar e gastar com confiança e clareza.
                    </Heading>
                    <Image src="/images/Devices.svg" alt="all devices"/>
                    <ColoredButton href="/singup">
                        Comece sua jornada
                    </ColoredButton>
                </Container>

                <Flex
                    h="400px"
                    bgImage="/images/Footer.svg"
                    bgRepeat="no-repeat"
                    bgSize="cover"
                    textAlign="center"
                    flexDirection="column"
                    justifyContent="space-between"
                    p={5}
                >
                    <Flex flexWrap="wrap" flex="1" px={10} pt="100px" alignItems="center" justifyContent={["center","space-between"]}>

                        <Image src="/images/Footer-logo.png" alt="Plus logo"/>

                        <Flex gap={10}>
                            <Button
                                bg="transparent"
                                _hover={{bg: "transparent"}}
                            >

                                <Icon 
                                    as={AiFillInstagram}
                                    boxSize={"30px"}
                                    transition="200ms ease-in-out"
                                    _hover={{boxSize: "32px"}}
                                    bgGradient='linear(to-r,brand.green-500,brand.orange-500)'
                                    borderRadius={"10px"}
                                />
                            </Button>

                            <Button
                                bg="transparent"
                                _hover={{bg: "transparent"}}
                            >
                                <Icon 
                                    as={BsTwitter}
                                    boxSize={"30px"}
                                    bgGradient='linear(to-r,brand.green-500,brand.orange-500)'
                                    borderRadius={"5px"}
                                    transition="200ms ease-in-out"
                                    _hover={{boxSize: "32px"}}
                                />
                            </Button>

                            <Button
                                bg="transparent"
                                _hover={{bg: "transparent"}}
                            >
                                <Icon 
                                    as={AiFillYoutube}
                                    boxSize={"30px"}
                                    bgGradient='linear(to-r,brand.green-500,brand.orange-500)'
                                    borderRadius={"5px"}
                                    transition="200ms ease-in-out"
                                    _hover={{boxSize: "32px"}}
                                />
                            </Button>
                        </Flex>
                    </Flex>
                    <Text color="brand.white-900">
                        ©2022-2023 all rights reserved
                    </Text>
                </Flex>
            
            </Box>
        </Box>
    )
}


export default LandingPage