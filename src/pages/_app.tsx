import type { AppProps } from 'next/app'
import { useState } from 'react'

import {ChakraProvider} from "@chakra-ui/react"
import { theme } from '../styles/theme'

import {AuthProvider} from "../context/authContext"
import {TransactionProvider} from "../context/transactionContext"
import { CategoryProvider } from '../context/categoryContext'

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  const [supabase] = useState(() => createBrowserSupabaseClient())


  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>

      
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <TransactionProvider>
            <CategoryProvider>

              <Component {...pageProps} />

            </CategoryProvider>
          </TransactionProvider>
        </AuthProvider>
      </ChakraProvider>
      

    </SessionContextProvider>
  )
}

export default MyApp
