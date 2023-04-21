import { Box, Button, Flex, Spinner, Text } from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const { status, data } = useSession();

  const router = useRouter();

  useEffect(() => {
    console.log("data", data)
    if (status === 'unauthenticated') {
      router.replace('./login');
    }
  }, [status]);

  return (
    <>
      <Head>
        <title>Login system</title>
        <meta name="description" content="Simple login system developed with next-auth" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {status && status === 'authenticated' && (
        <Flex
          justifyContent="center"
          alignItems="center"
          h="100vh"
          w="100vw"
          direction="column"
          gap={6}
        >
          <Text color="red" fontSize="3xl">
            This page should be protected
          </Text>
          <Button onClick={() => signOut()}>Log out</Button>
        </Flex>
      )}

      {status && status === 'loading' && (
        <Box
          w="100vw"
          h="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner
            thickness="15px"
            speed="0.65s"
            emptyColor="gray.200"
            color="primary"
            width="100px"
            height="100px"
          />
        </Box>
      )}
    </>
  );
}
