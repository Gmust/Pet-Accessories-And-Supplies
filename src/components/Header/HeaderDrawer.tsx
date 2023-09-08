import { Navbar } from '@/src/components/Header/Navbar';
import { Drawer, DrawerContent } from '@chakra-ui/modal';
import {
  Button,
  DrawerBody,
  DrawerCloseButton,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
} from '@chakra-ui/react';
import { FocusableElement } from '@chakra-ui/utils';
import { RefObject } from 'react';


interface HeaderDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  btnRef: RefObject<FocusableElement> | undefined;
}

export const HeaderDrawer = ({ btnRef, onClose, isOpen }: HeaderDrawerProps) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Available pages</DrawerHeader>

        <DrawerBody>
          <Navbar/>
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

