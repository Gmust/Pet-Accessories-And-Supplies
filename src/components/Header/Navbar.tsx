'use client';

import { navbarOptions } from '@/src/utils/constants';
import { Flex, Link, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = ({ onClose }: { onClose?: () => void }) => {

  const pathname = usePathname();

  return (
    <Stack spacing={{ base: '4', md: '24' }} as='nav' direction={{ base: 'column', md: 'row' }}>
      {navbarOptions.map(({ id, Icon, path, title }) =>
        <Link as={NextLink} href={path} key={id} onClick={onClose}>
          <Flex alignItems='center' borderBottom={pathname === path ? '1px solid #63B3ED' : '0px'}>
            <Text fontSize={{ base: '3xl', md: '2xl' }}>
              <Icon style={{ marginRight: '5px' }} />
            </Text>
            <Text fontSize={{ base: 'md', md: 'xl' }}>
              {title}
            </Text>
          </Flex>
        </Link>,
      )}
    </Stack>
  );
};

