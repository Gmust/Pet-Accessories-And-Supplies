import { ordersService } from '@/src/services/ordersService';
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Button, Heading, HStack, useToast } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DeclineOrder {
  isOpen: boolean,
  onClose: () => void,
  orderId: number
}

export const DeclineOrder = ({ isOpen, onClose, orderId }: DeclineOrder) => {

  const { data: session } = useSession();
  const toast = useToast();
  const router = useRouter();

  const handleDeclineOrder = async () => {
    try {
      const response = await ordersService.cancelOrder(session?.user.jwt!, orderId);
      onClose();
      if (response.status === 200) {
        toast({
          status: 'success',
          title: 'Success',
          description: 'Order canceled',
        });
        router.refresh();
      }
    } catch (e: any) {
      console.log(e);
      // toast({
      //   status: 'error',
      //   title: 'Error',
      //   description: e.response.data.error.message,
      // });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='sm'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Order canceling</ModalHeader>
        <ModalCloseButton />
        <ModalBody display='flex' alignItems='center' justifyContent='center' flexDirection='column'>
          <Heading fontSize='xl'>Cancel order?</Heading>
          <HStack marginY='2'>
            <Button colorScheme='green' onClick={() => handleDeclineOrder()}>
              Yes
            </Button>
            <Button colorScheme='red' onClick={onClose}>No</Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

