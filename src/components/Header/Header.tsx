'use client';


import { Navbar } from '@/src/components/Header/Navbar';
import { Box, Button, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import { MdOutlinePets } from 'react-icons/md';

export const Header = () => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      padding={6}
      bg='#8D9AF8'
      color='white'
    >
      <Flex align='center' mr={5} display={{ base: 'none', md: 'flex' }}>
        <Heading as='h1' size='lg' letterSpacing={'tighter'}>
          PawShop
        </Heading>
        <MdOutlinePets style={{ fontSize: '32px', marginLeft: '8px' }} />
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
        <MdOutlinePets style={{ fontSize: '32px', marginLeft: '8px' }} />
      </Box>

      <Navbar />

      <Box
        display={{ base: isOpen ? 'block' : 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        <Button
          variant='outline'
          _hover={{ bg: 'teal.700', borderColor: 'teal.700' }}
        >
          Create account
        </Button>
      </Box>
    </Flex>
  );
};

