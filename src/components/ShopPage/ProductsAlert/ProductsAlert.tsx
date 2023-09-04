'use client';

import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert';

export const ProductsAlert = () => {
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
        Try later or reload page
      </AlertDescription>
    </Alert>
  );
};

