'use client';

import { Cart } from '@/src/components/Header/Cart';
import { Navbar } from '@/src/components/Header/Navbar';
import { Drawer, DrawerContent } from '@chakra-ui/modal';
import {
  Box,
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RefObject } from 'react';
import { BiSolidUser } from 'react-icons/bi';


interface HeaderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HeaderDrawer = ({  onClose, isOpen }: HeaderDrawerProps) => {
  const { data: session } = useSession();


  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      data-testid='drawer'
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Available pages</DrawerHeader>
        <DrawerBody>
          <Navbar onClose={onClose} />
          <Link href={`/user/${session?.user.id!}`} onClick={onClose}>
            <Flex w='full' mt='4' justify='flex-start' align='center'>
              <Text fontSize='xl' mr='4'>
                <BiSolidUser />
              </Text>
              <Heading fontSize='xl'>My account</Heading>
            </Flex>
          </Link>
          <Box mt='10'>
            <Heading>Cart</Heading>
            <Cart />
          </Box>
        </DrawerBody>

        <DrawerFooter>
          <Button variant='outline' mr={3} onClick={onClose}>
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

