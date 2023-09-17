'use client';

import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export const ProductsAlert = () => {

  const router = useRouter();

  return (
    <Alert
      status='warning'
      variant='subtle'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      textAlign='center'
      height='200px'
      marginY='10vh'
    >
      <AlertIcon boxSize='40px' mr={0} />
      <AlertTitle mt={4} mb={1} fontSize='lg'>
        No products were found matching the specified filters
      </AlertTitle>
      <AlertDescription maxWidth='sm'>
        Try later or reload page or change filters <Button variant='solid' color='teal'
                                                           onClick={() => router.refresh()}>Reload</Button>
      </AlertDescription>
    </Alert>
  );
};

