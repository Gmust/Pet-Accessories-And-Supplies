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
          bg='#7e8adf' color='white' bottom={0} right={0} left={0} position='relative' width='full'
          padding={{ base: '5', md: '1' }} >
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