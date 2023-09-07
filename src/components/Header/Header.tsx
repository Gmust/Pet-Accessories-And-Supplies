'use client';


import { Navbar } from '@/src/components/Header/Navbar';
import { Avatar, Box, Button, Flex, Heading, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import Link from 'next/link';
import { MdOutlinePets } from 'react-icons/md';
import { TfiShoppingCart } from 'react-icons/tfi';

export const Header = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  const isAuth = false;
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)', {
    fallback: false,
  });

  return (
    <Flex
      align='center'
      justify='space-between'
      padding={3}
      bg='#7e8adf'
      color='white'
    >
      <Link href='/'>
        <Flex align='center' mr={5} display={{ base: 'none', md: 'flex' }}>
          <Heading as='h1' size='lg' letterSpacing={'tighter'}>
            PawShop
          </Heading>
          <MdOutlinePets style={{ fontSize: '32px', marginLeft: '8px' }} />
        </Flex>
        <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
          <MdOutlinePets style={{ fontSize: '32px', marginLeft: '8px' }} />
        </Box>
      </Link>

      <Navbar />


      <Flex alignItems='center' justifyContent='space-between' marginRight={3}>
        {
          isAuth ?
            <Flex flexDirection='column' marginRight={6} alignItems='center'>
              <Avatar size='sm' cursor='pointer' />
            </Flex>
            :
            <Button colorScheme='yellow' variant='solid' marginRight={6}>
              Create Account
            </Button>
        }
        <TfiShoppingCart style={{ fontSize: '30px', cursor: 'pointer' }} />
      </Flex>


    </Flex>
  );
};

