import {
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type FormData = {
  email: string;
  password: string;
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),

  password: yup.string().required('Password is required'),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema) as Resolver<FormData>,
  });

  const [error, setError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.ok) {
      router.push('/');
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" minH="100vh">
      <Container
        maxW="sm"
        py={{ base: 3, md: 6 }}
        background="#F9F6F5"
        borderRadius="md"
      >
        <Stack spacing={8}>
          <Stack spacing={6}>
            <Stack spacing={{ base: 2, md: 3 }} textAlign="center">
              <Heading size={{ base: 'sm', md: 'lg' }}>Log in</Heading>
              <HStack spacing="1" justify="center">
                <Text color="muted">Don&apos;t have an account?</Text>
                <Link href="./create-account" style={{ color: '#73C6B6' }}>
                  Sign up
                </Link>
              </HStack>
            </Stack>
          </Stack>
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={6}>
              <Stack spacing="20px">
                <FormControl id="email">
                  <FormLabel srOnly>Email address</FormLabel>
                  <Input
                    {...register('email')}
                    name="email"
                    type="email"
                    placeholder="Email"
                    autoComplete="email"
                  />
                  <FormHelperText color="red">
                    {errors?.email?.message}
                  </FormHelperText>
                </FormControl>
                <FormControl id="password">
                  <FormLabel srOnly>Password</FormLabel>
                  <InputGroup>
                    <Input
                      {...register('password')}
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                      autoComplete="current-password"
                    />
                    <InputRightElement
                      cursor="pointer"
                      onClick={() =>
                        showPassword
                          ? setShowPassword(false)
                          : setShowPassword(true)
                      }
                    >
                      {showPassword ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText color="red">
                    {errors?.password?.message}
                  </FormHelperText>
                </FormControl>
                <Stack alignSelf="end" fontSize="sm">
                  {/* <Checkbox defaultChecked>Remember me</Checkbox> */}
                  <Link href="./reset-password">Forgot password?</Link>
                </Stack>
              </Stack>
              <Stack spacing="4">
                <Button type="submit">Sign in</Button>
                <Text color="red">{error ? error : ''}</Text>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Login;
