'use client';

import { authService } from '@/src/services/authService';
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
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiHide, BiShow } from 'react-icons/bi';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSmallerThan800] = useMediaQuery('(max-width: 800px)');
  const { handleSubmit, register, formState: { isSubmitting, errors } } = useForm<LoginUser>({ mode: 'onBlur' });
  const toast = useToast();
  const router = useRouter();

  const onSubmit = async (data: LoginUser) => {
    try {
      const res = await authService.loginUser(data);
      console.log(res);
      toast({
        title: 'Successfully logged in.',
        description: 'Redirecting...',
        status: 'success',
        isClosable: true,
      });
      router.push('/shop');
    } catch (e) {
      toast({
        title: 'Error',
        description: 'Something went wrong, try again later',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex
      align={'center'}
      justify={'center'}
      height='100vh'
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack>
              <FormControl isInvalid={!!errors.identifier}>
                <FormLabel htmlFor='identifier'>Email of Username</FormLabel>
                <Input
                  id='identifier'
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
              Already have an account? <Link href='/registration' color={'blue.400'}>Sign in</Link>
            </Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};