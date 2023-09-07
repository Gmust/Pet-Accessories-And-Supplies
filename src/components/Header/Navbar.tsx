'use client';

import { navbarOptions } from '@/src/utils/constants';
import { Flex, HStack, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

export const Navbar = () => {

  return (
    <HStack spacing='24' as='nav'
            display={{ md: 'flex', base: 'none' }}>
      {navbarOptions.map(({ id, Icon, path, title }) =>
        <Link as={NextLink} href={path} key={id}>
          <Flex alignItems='center'>
            <Text fontSize={{ base: 'xl', md: '2xl' }}>
              <Icon style={{ marginRight: '5px' }} />
            </Text>
            <Text fontSize={{ base: 'md', md: 'xl' }}>
              {title}
            </Text>
          </Flex>
        </Link>,
      )}
    </HStack>
  );
};

