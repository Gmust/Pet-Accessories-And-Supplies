'use client';
import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert';
import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
                                error,
                                reset,
                              }: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Alert
      status='error'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='200px'
      mt='20'
    >
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        Something went wrong
      </AlertTitle>
      <AlertDescription maxWidth='sm'>
        <Link href='/shop'>
          <Button colorScheme='teal'>
            Return to the shop page
          </Button>
        </Link>
      </AlertDescription>
    </Alert>
  );
}