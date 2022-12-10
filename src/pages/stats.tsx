import { NextPage } from "next";
import Head from "next/head";

import { Menu } from "../components/Menu";
import { Box, Container, Flex } from "@chakra-ui/react";
import { ChartBar } from "../components/Charts/ChartBar";
import { ChartDoughtnut } from "../components/Charts/ChartDoughtnut";


const Stats: NextPage = () => {
    return (
        <>
            <Head>
                <title>Plus | Estatistica</title>
                <meta name="Plus" content="Melhore seu gerenciamento financeiro" />

                {/* Favicon */}
                <link rel="Plus" href="/favicon.ico" type="image/x-icon" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
                <link rel="manifest" href="/site.webmanifest"/>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
        
            <Menu />

            <Container maxW="1100px">

                <ChartBar/>

                <Flex
                    flexWrap="wrap"
                    justify={["center",
                    "center",
                    "center",
                    "space-between"]}
                    align="center"
                    marginTop={10}
                    gap={5}
                >
                    <ChartDoughtnut chartTitle={"Despesa"} />
                    <ChartDoughtnut chartTitle={"Receita"}/>
                </Flex>

                
            </Container>
        </>
    )
}


export default Stats