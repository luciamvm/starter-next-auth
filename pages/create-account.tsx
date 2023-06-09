import {
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),

  password: yup.string().required('Password is required'),
  passwordConfirmation: yup.string(),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema) as Resolver<FormData>,
  });

  const [response, setResponse] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const { password, passwordConfirmation } = data;

    if (passwordConfirmation === password) {
      const res = await fetch('/api/createAccount', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res?.ok) {
        setResponse('Account created with success');
        setTimeout(() => {
          router.push('/');
        }, 200);
      } else {
        setResponse('This email already exists ');
      }
    } else {
      setResponse("Passwords don't match");
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
        <Stack spacing="8">
          <Heading size={{ base: 'sm', md: 'lg' }} textAlign="center">
            Create an account
          </Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={8}>
              <Stack spacing={6}>
                <FormControl id="name">
                  <FormLabel srOnly>Your name</FormLabel>
                  <Input
                    {...register('name')}
                    name="name"
                    type="text"
                    placeholder="Name"
                    autoComplete="given-name"
                  />
                  <FormHelperText color="red">
                    {errors?.email?.message}
                  </FormHelperText>
                </FormControl>
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
                      autoComplete="new-password"
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
                <FormControl id="passwordConfirmation">
                  <FormLabel srOnly>Confirm password</FormLabel>

                  <InputGroup>
                    <Input
                      {...register('passwordConfirmation')}
                      name="passwordConfirmation"
                      type={showPasswordConfirmation ? 'text' : 'password'}
                      placeholder="Confirm password"
                      autoComplete="new-password"
                    />
                    <InputRightElement
                      cursor="pointer"
                      onClick={() =>
                        showPasswordConfirmation
                          ? setShowPasswordConfirmation(false)
                          : setShowPasswordConfirmation(true)
                      }
                    >
                      {showPasswordConfirmation ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText color="red">
                    {errors?.passwordConfirmation?.message}
                  </FormHelperText>
                </FormControl>
              </Stack>

              <Stack spacing="4">
                <Button type="submit">Submit</Button>
                <Text color="red">{response ? response : ''}</Text>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Container>
    </Flex>
  );
};

export default Register;
