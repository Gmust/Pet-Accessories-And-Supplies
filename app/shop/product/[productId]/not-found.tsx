'use client';

import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert';
import { Button, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function NotFound() {

  const router = useRouter();

  return (
    <Flex justify='center' direction='column' align='center' height='60vh'>
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
          404 Not found
        </AlertTitle>
        <AlertDescription maxWidth='sm' display='flex' alignItems='center' flexDirection='column' marginTop='1'>
          Seems like there is no such product
          <Button marginTop='1' onClick={() => router.back()}>
            Return
          </Button>
        </AlertDescription>
      </Alert>
    </Flex>
  );
}