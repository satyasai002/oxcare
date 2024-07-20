import "@/styles/globals.css";
import { ChakraProvider } from '@chakra-ui/react'
import { Anek_Telugu} from 'next/font/google'

const anek_telugu = Anek_Telugu({
  weight:['400','500', '700'], // if single weight, otherwise you use array like [400, 500, 700],
  style: 'normal', // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ['latin'],
  // preload: false
});

export default function MyApp({ Component, pageProps }) {
  return (
    <main className={anek_telugu.className}>
      <ChakraProvider><Component {...pageProps} /></ChakraProvider>
    </main>
  )
}
