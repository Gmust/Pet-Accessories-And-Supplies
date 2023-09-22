'use client';

import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Text } from '@chakra-ui/react';

export const NoOrders = () => {
  return (
    <Alert status='warning' w='full'>
      <AlertIcon />
      <Text fontSize='xl'>You have no orders</Text>
    </Alert>
  );
};

