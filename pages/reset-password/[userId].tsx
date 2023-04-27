import {
  Button,
  Container,
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
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import * as yup from 'yup';

type FormData = {
  password: string;
  passwordConfirmation: string;
};

const validationSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup.string(),
});

const ResetPassword = () => {
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

    const userId = router.query.userId;

    if (passwordConfirmation === password) {
      setResponse('Great');
      const res = await fetch('/api/resetPassword', {
        method: 'POST',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId, password: password }),
      });

      if (res?.ok) {
        router.push('/login');
      } else {
        setResponse('Something is wrong ');
      }
    } else {
      setResponse('Passwords are not equal');
    }
  };

  return (
    <Container maxW="md" py={{ base: '12', md: '24' }}>
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>
              Define your new password
            </Heading>
          </Stack>
        </Stack>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing="6">
            <Stack spacing="20px">
              <FormControl id="password">
                <FormLabel srOnly>Password</FormLabel>
                <InputGroup>
                  <Input
                    {...register('password')}
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="New password"
                    roundedBottom="0"
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
                    roundedBottom="0"
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
              <Button type="submit">Send Request</Button>
              <Text color="red">{response ? response : ''}</Text>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default ResetPassword;
