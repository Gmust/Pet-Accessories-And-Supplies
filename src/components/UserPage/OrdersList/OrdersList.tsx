'use client';

import { Orders } from '@/src/components/UserPage/OrdersList/Orders';
import { OrdersResponse } from '@/types';
import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react';


export const OrdersList = ({ data, meta }: OrdersResponse) => {
  return (
    <TableContainer>
      <Table variant='striped' colorScheme='telegram'>
        <Thead>
          <Tr>
            <Th>Address</Th>
            <Th>City</Th>
            <Th>Country</Th>
            <Th>Confirmed</Th>
            <Th>Products</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Orders order={data} />
        </Tbody>
      </Table>
    </TableContainer>
  );
};

