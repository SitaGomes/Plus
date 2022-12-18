import type { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'

//* Components
import { AddTransaction } from '../components/AddTransaction'
import { Menu } from '../components/Menu'
import { Box, Container, HStack } from '@chakra-ui/react'
import { TransactionCard } from '../components/TransactionCards'
import { TransactionHistory } from '../components/TransactionHistory'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'


const Dashboard: NextPage = () => {

  return (
    <>
      <Head>
        <title>Plus | Dashboard</title>
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
        <AddTransaction />

        <HStack mt={5} gap={5} flexWrap="wrap" justify={["center", "center","flex-start"]}>

          <TransactionCard />

          <Box w={["100%", 500]} flex="1">
            <TransactionHistory />
          </Box>

        </HStack>


      </Container>

     
    </>
  )
}

export default Dashboard

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


