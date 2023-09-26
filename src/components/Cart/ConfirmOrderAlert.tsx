import { CartContext } from '@/context';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

interface ConfirmOrderAlertProps {
  onClose: () => void,
  isOpen: boolean,
  totalPrice: number
}

export const ConfirmOrderAlert = ({ isOpen, onClose, totalPrice }: ConfirmOrderAlertProps) => {

    const cancelRef = React.useRef();
    const { setOrder, cart } = useContext(CartContext);
    const router = useRouter();

    const handleCreateLocalOrder = () => {
      setOrder({
          attributes: {
            products: {
              data: cart!.data.attributes.products.data,
            },
            confirmed: false,
            totalPrice,
            address: '',
            city: '',
            amount: cart!.data.attributes.products.data.length,
            country: '',
          },
        },
      );
      router.push('/order');
      onClose();
    };


    return (
      <AlertDialog
        motionPreset='slideInBottom'
        // @ts-ignore
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Confirm order?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to confirm your order?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              // @ts-ignore
              ref={cancelRef} onClick={onClose} colorScheme='red'>
              No
            </Button>
            <Button colorScheme='green' ml={3} onClick={() => handleCreateLocalOrder()}>
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
;

