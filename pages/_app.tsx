import '@/styles/global.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import { TailwindIndicator } from '@/components/utils/Indicator'
import  {Provider} from "react-redux"
import { store } from '@/store/store'
import { QueryClientProvider, QueryClient} from '@tanstack/react-query'
import { Toaster } from "@/components/ui/toaster"
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


//NEXT_PUBLIC_GOOGLE_KEY
const queryClient = new QueryClient()
export default function App({ Component, pageProps }: AppProps) {
  
  return( 
    <>
      <Head>
          <title>Stack Blog</title>
          <meta
          name="description"
         content="Enjoy thousands of blog collections"
        />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Provider store={store}>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_KEY ||""}>
          <QueryClientProvider client={queryClient}>
              <Component {...pageProps}/>
              <Toaster/>
              {/* <TailwindIndicator/> */}
              <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </GoogleOAuthProvider>
        </Provider>
 
    </ThemeProvider>
    </>

  )
}
