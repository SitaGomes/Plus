import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'


//* Components
import { AddTransaction } from '../components/AddTransaction'
import { Menu } from '../components/Menu'
import { Box, Container, HStack } from '@chakra-ui/react'
import { TransactionCard } from '../components/TransactionCards'
import { TransactionHistory } from '../components/TransactionHistory'


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

export const getServerSideProps: GetServerSideProps = async (context) => {
   
  return {
    props: {}, // will be passed to the page component as props
  }
}


