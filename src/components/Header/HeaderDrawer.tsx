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
import { Ref, RefObject } from 'react';


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
        <DrawerHeader>Create your account</DrawerHeader>

        <DrawerBody>
          <Input placeholder='Type here...' />
        </DrawerBody>

        <DrawerFooter>
          <Button variant='outline' mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme='blue'>Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

