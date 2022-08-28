import type { NextPage } from 'next'
import Head from 'next/head'

//* Components
import { AddTransaction } from '../components/AddTransaction'
import { Menu } from '../components/Menu'
import { Container } from '@chakra-ui/react'


const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Plus | Dashboard</title>
        <meta name="Plus" content="Melhore seu gerenciamento financeiro" />

        {/* Favicon */}
        <link rel="Plus" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
      </Head>

      <Menu />

      <Container maxW="1100px">
        <AddTransaction />
      </Container>

     
    </div>
  )
}

export default Home
