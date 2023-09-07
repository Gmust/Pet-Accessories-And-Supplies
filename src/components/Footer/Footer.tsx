'use client';

import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { FaInstagram, FaTelegramPlane } from 'react-icons/fa';
import { FiYoutube } from 'react-icons/fi';
import { MdOutlinePets } from 'react-icons/md';

export const Footer = () => {
  return (
    <Flex justify='space-between' align='center' as='footer' flexDirection={{ base: 'column', md: 'row' }}
         padding='5' bg='#7e8adf' color='white'
    >
      <Box display={{ base: 'flex', md: 'inline' }} alignItems='center'>
        <Flex align='center' mr={5}>
          <Heading as='h1' size='lg' letterSpacing={'tighter'}>
            PawShop
          </Heading>
          <MdOutlinePets style={{ fontSize: '32px', marginLeft: '8px' }} />
        </Flex>
        <Flex>
          <Text>© 2023 PawShop. All rights reserved</Text>
        </Flex>
      </Box>
      <Flex width='full' justify='space-around' align='center' marginTop={{ base: '10px', md: '0px' }}>
        <Link href={'#'}>
          <Text fontSize='xl'>
            <FiYoutube />
          </Text>
        </Link>
        <Link href={'#'}>
          <Text fontSize='xl'>
            <FaTelegramPlane />
          </Text>
        </Link>
        <Link href={'#'}>
          <Text fontSize='xl'>
            <FaInstagram />
          </Text>
        </Link>
      </Flex>
    </Flex>
  );
};