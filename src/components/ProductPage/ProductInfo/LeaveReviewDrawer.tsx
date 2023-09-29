import { LeaveReviewForm } from '@/src/components/ProductPage/ProductInfo/LeaveReviewForm';
import { Drawer, DrawerContent } from '@chakra-ui/modal';
import { Button, DrawerBody, DrawerCloseButton, DrawerFooter, DrawerHeader, DrawerOverlay } from '@chakra-ui/react';
import React from 'react';


interface LeaveReviewDrawerParams {
  isOpen: boolean,
  onClose: () => void,
  onOpen: () => void,
  productId: number
}

export const LeaveReviewDrawer = ({ onOpen, isOpen, onClose, productId }: LeaveReviewDrawerParams) => {

  const firstField = React.useRef();


  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      // @ts-ignore
      initialFocusRef={firstField}
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth='1px'>
          Leave Review
        </DrawerHeader>
        <DrawerBody>
          <LeaveReviewForm productId={productId} onClose={onClose} />
        </DrawerBody>
        <DrawerFooter borderTopWidth='1px'>
          <Button variant='outline' mr={3} onClick={onClose}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

