'use client';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input, InputGroup, InputRightElement,
  Link, ListItem,
  Stack,
  Text, UnorderedList,
  useColorModeValue,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiHide, BiShow } from 'react-icons/bi';

interface LoginInputs {
  email: string,
  password: string
}

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSmallerThan800] = useMediaQuery('(max-width: 800px)');
  const { handleSubmit, register, formState: { isSubmitting, errors } } = useForm<LoginInputs>({ mode: 'onBlur' });

  const onSubmit = (data: LoginInputs) => {
    console.log(data);
  };

  return (
    <Flex
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          width={isSmallerThan800 ? 'sm' : 'xl'}
          boxShadow={'lg'}
          p={8}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input
                  id='email'
                  placeholder='example@gmail.com'
                  {...register('email', {
                    required: 'Email is required',
                    minLength: { value: 4, message: 'Minimum length should be 4' },
                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  })}
                />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                  {errors.email?.type === 'pattern' && 'Invalid email'}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <InputGroup>
                  <Input
                    id='password'
                    placeholder='***********'
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Password is required',
                    })}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
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
            <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
              Submit
            </Button>
          </form>
          <Stack pt={6}>
            <Text align={'center'}>
              Already have an account? <Link href='/login' color={'blue.400'}>Sign in</Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};