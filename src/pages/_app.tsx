import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"

import {ChakraProvider} from "@chakra-ui/react"
import { theme } from '../styles/theme'

import {AuthProvider} from "../context/authContext"
import {TransactionProvider} from "../context/transactionContext"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <TransactionProvider>

            <Component {...pageProps} />
 
          </TransactionProvider>
        </AuthProvider>
      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
