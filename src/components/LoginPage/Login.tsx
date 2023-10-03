'use client';

import { LoginUser } from '@/types';
import { Link } from '@chakra-ui/next-js';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
  useMediaQuery,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiHide, BiShow } from 'react-icons/bi';

interface LoginProps {
  onSubmitTest?: () => void;
}


export const Login = ({ onSubmitTest }: LoginProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSmallerThan800] = useMediaQuery('(max-width: 800px)');
  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<LoginUser>({ mode: 'onBlur' });
  const toast = useToast();

  const onSubmit = async ({ identifier, password }: LoginUser) => {
    if (!identifier) return setError('identifier', { type: 'required', message: 'Provide email or username' });
    if (!password) return setError('password', { type: 'required', message: 'Provide password' });

    try {
      const result = await signIn('credentials', {
        redirect: true,
        identifier,
        password,
      }).catch((e) => {
      });
      if (result?.status! === 401) {
        toast({
          title: 'Error',
          description: 'Invalid credentials',
          status: 'error',
        });
        return;
      } else {
        toast({
          title: 'Success',
          description: 'Successfully logged in',
          status: 'success',
        });
        redirect('/shop');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Flex
      align={'center'}
      justify={'center'}
      height='92vh'
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          width={isSmallerThan800 ? 'sm' : 'xl'}
          boxShadow={'lg'}
          p={8}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign in
          </Heading>
          <form onSubmit={onSubmitTest ? handleSubmit(onSubmitTest) : handleSubmit(onSubmit)}>
            <VStack>
              <FormControl isInvalid={!!errors.identifier}>
                <FormLabel htmlFor='identifier'>Email or Username</FormLabel>
                <Input
                  id='identifier' data-testid='identifier'
                  placeholder='example@gmail.com or coolUsername'
                  {...register('identifier', {
                    required: 'Identifier is required',
                    minLength: { value: 4, message: 'Minimum length should be 4' },
                  })}
                />
                <FormErrorMessage>
                  {errors.identifier && errors.identifier.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <InputGroup>
                  <Input
                    id='password' data-testid='password'
                    placeholder='***********'
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Password is required',
                    })}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'} data-testid='show-password'
                      onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      <Text fontSize='xl'>
                        {showPassword ? <BiShow /> : <BiHide />}
                      </Text>
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
            </VStack>
            <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit' data-testid='submit-form'>
              Submit
            </Button>
          </form>
          <Stack pt={6}>
            <Text align={'center'}>
              Already have an account? <Link href='/registration' color={'blue.400'}>Sign in</Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};