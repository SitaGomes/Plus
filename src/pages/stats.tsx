import { GetServerSidePropsContext, NextPage } from "next";
import Head from "next/head";

import { Menu } from "../components/Menu";
import { Box, Container, Flex } from "@chakra-ui/react";
import { ChartBar } from "../components/Charts/ChartBar";
import { ChartDoughtnut } from "../components/Charts/ChartDoughtnut";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";


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