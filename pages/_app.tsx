import '@/styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
};

export default App;
