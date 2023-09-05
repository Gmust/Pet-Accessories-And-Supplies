'use client';

import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation'

export const ProductsAlert = () => {

  const router = useRouter();

  return (
    <Alert
      status='error'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='200px'
    >
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        Something went wrong!
      </AlertTitle>
      <AlertDescription maxWidth='sm'>
        Try later or reload page <Button variant='outline' color='yellow'
                                         onClick={() => router.refresh()}>Reload</Button>
      </AlertDescription>
    </Alert>
  );
};

