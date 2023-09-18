'use client';


import { HeaderDrawer } from '@/src/components/Header/HeaderDrawer';
import { Navbar } from '@/src/components/Header/Navbar';
import { Avatar, Box, Button, Flex, Heading, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RefObject, useRef } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlinePets } from 'react-icons/md';
import { TfiShoppingCart } from 'react-icons/tfi';

export const Header = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const btnRef = useRef() as RefObject<FocusableElement>;
  const isAuth = false;


  return (
    <Flex
      align='center'
      justify='space-between'
      padding={3}
      bg='#7e8adf'
      color='white'
      zIndex={2}
    >
      <Link href='/'>
        <Flex align='center' mr={5}>
          <Heading as='h1' size='lg' letterSpacing={'tighter'}>
            PawShop
          </Heading>
          <MdOutlinePets style={{ fontSize: '32px', marginLeft: '8px' }} />
        </Flex>
      </Link>

      <Flex display={{ base: 'flex', md: 'none' }}>
        <Text fontSize='2xl'>
          <GiHamburgerMenu ref={btnRef} onClick={onOpen} />
        </Text>
        <HeaderDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      </Flex>

      <Box display={{ base: 'none', md: 'flex' }}>
        <Navbar />
      </Box>

      <Flex alignItems='center' justifyContent='space-between'
            display={{ md: 'flex', base: 'none' }} marginRight={3}>
        {
          isAuth ?
            <Flex flexDirection='column' marginRight={6} alignItems='center'>
              <Avatar size='sm' cursor='pointer' />
            </Flex>
            :
            <Button colorScheme='yellow' variant='solid' marginRight={6}
                    onClick={() => router.push('/login')}
            >
              <Flex>
                <Text>
                  Create Account
                </Text>
                <Text fontWeight='bold'>/</Text>
                <Text>
                  Login
                </Text>
              </Flex>
            </Button>
        }
        <TfiShoppingCart style={{ fontSize: '30px', cursor: 'pointer' }} />
      </Flex>
    </Flex>
  );
};

