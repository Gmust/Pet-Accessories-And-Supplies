'use client';

import { authService } from '@/src/services/authService';
import { cartService } from '@/src/services/cartService';
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
  Link,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useColorModeValue,
  useMediaQuery,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiHide, BiShow } from 'react-icons/bi';

export const Registration = () => {

  const {
    register, handleSubmit, formState: { errors, isLoading, isSubmitting }, reset,
  } = useForm<RegisterUser>({ mode: 'onBlur' });
  const [showPassword, setShowPassword] = useState(false);
  const [isSmallerThan800] = useMediaQuery('(max-width: 800px)');
  const toast = useToast();

  const onSubmit = async (data: RegisterUser) => {
    try {
      const res = await authService.registerUser(data)
        .then(async ({ id }) => await cartService.createCart(id))
        .catch((err) => console.log(err));
      toast({
        title: 'Account created.',
        description: 'We\'ve created your account for you.',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      reset();
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
              <FormControl isInvalid={!!errors.username}>
                <FormLabel htmlFor='username'>Username</FormLabel>
                <Input
                  id='username'
                  placeholder='coolUsername'
                  {...register('username', {
                    required: 'Username is required',
                    minLength: { value: 4, message: 'Minimum length should be 4' },
                  })}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
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
                      minLength: { value: 4, message: 'Minimum length should be 8' },
                      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/,
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
                  {errors.password?.type === 'pattern' &&
                    <UnorderedList>
                      <ListItem>Should contain at least a capital letter</ListItem>
                      <ListItem>Should contain at least a number</ListItem>
                      <ListItem>Should contain at least a special character</ListItem>
                    </UnorderedList>
                  }
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

