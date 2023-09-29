import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

interface UnauthorizedAlertParams {
  onClose: () => void,
  onOpen: () => void,
  isOpen: boolean
}

export const UnauthorizedAlert = ({ onClose, onOpen, isOpen }: UnauthorizedAlertParams) => {
  const cancelRef = React.useRef();

  return (
    <AlertDialog
      isOpen={isOpen}
      //@ts-ignore
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Unable to leave review
          </AlertDialogHeader>

          <AlertDialogBody>
            To leave review you need to be logged in!
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              // @ts-ignore
              ref={cancelRef} onClick={onClose}
              colorScheme='red'
            >
              Cancel
            </Button>
            <Button colorScheme='green' onClick={onClose} ml={3}>
              <Link href='/login'>
                Log in
              </Link>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

