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
import { useState } from 'react';
import { Resolver, useForm } from 'react-hook-form';
import * as yup from 'yup';

type FormData = {
  email: string;
};

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
});

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema) as Resolver<FormData>,
  });

  const [response, setResponse] = useState('');

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/forgotPassword', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (res?.ok) {
      setResponse('You will recieve a reset email if that email exist');
    } else {
      setResponse("That email isn't registered ");
    }
  };

  return (
    <Container maxW="md" py={{ base: '12', md: '24' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>Forgot Password</Heading>
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
            </Stack>

            <Stack spacing="4">
              <Button type="submit">Send Request</Button>
              <Text color="red">{response ? response : ''}</Text>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default ForgotPassword;
