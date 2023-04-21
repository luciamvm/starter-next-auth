import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import * as yup from 'yup';

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

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    console.log('data', data);

    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.ok) {
      router.push('/');
      console.log('router', router);
    } else {
      setError('Invalid email or password');
    }
  };
  return (
    <Container maxW="md" py={{ base: '12', md: '24' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>
              Log in to your account
            </Heading>
            {/* <HStack spacing="1" justify="center">
              <Text color="muted">Don't have an account?</Text>
              <Button variant="link" colorScheme="blue">
                Sign up
              </Button>
            </HStack> */}
          </Stack>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="6">
            <Stack spacing="20px">
              <FormControl id="email">
                <FormLabel srOnly>Email address</FormLabel>
                <Input
                  {...register('email')}
                  name="email"
                  type="email"
                  placeholder="Email"
                  roundedBottom="0"
                />
                <FormHelperText color="red">
                  {errors?.email?.message}
                </FormHelperText>
              </FormControl>
              <FormControl id="password">
                <FormLabel srOnly>Password</FormLabel>
                <Input
                  {...register('password')}
                  name="password"
                  type="password"
                  placeholder="Password"
                  roundedTop="0"
                />
                <FormHelperText color="red">
                  {errors?.password?.message}
                </FormHelperText>
              </FormControl>
            </Stack>
            {/* <Stack justify="space-between">
              <Checkbox defaultChecked>Remember me</Checkbox>
              <Button variant="link" colorScheme="blue" size="sm">
                Forgot password
              </Button>
            </Stack> */}
            <Stack spacing="4">
              <Button type="submit">Sign in</Button>
              <Text color="red">{error ? error : ''}</Text>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default Login;
