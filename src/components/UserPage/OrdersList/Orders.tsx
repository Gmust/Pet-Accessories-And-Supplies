import { ProductsInfo } from '@/src/components/UserPage/OrdersList/ProductsInfo';
import { OrderData } from '@/types';
import {
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  SimpleGrid,
  Td,
  Tr,
} from '@chakra-ui/react';
import { GiConfirmed } from 'react-icons/gi';
import { MdOutlineNotInterested } from 'react-icons/md';

interface OrdersProps {
  order: OrderData[];
}

export const Orders = ({ order }: OrdersProps) => {
  return (
    <>
      {
        order.map((item) => {
          return (
            <Tr>
              <Td>{item.attributes.address}</Td>
              <Td>{item.attributes.city}</Td>
              <Td>{item.attributes.country}</Td>
              <Td>
                {item.attributes.confirmed ?
                  <GiConfirmed style={{ fontSize: '30px', color: 'green' }} />
                  : <MdOutlineNotInterested style={{ fontSize: '30px', color: 'red' }} />}
              </Td>
              <Td>
                <Popover isLazy={true}>
                  <PopoverTrigger>
                    <Button>Products {item.attributes.products.data.length}</Button>
                  </PopoverTrigger>
                  <Portal>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverHeader>Header</PopoverHeader>
                      <PopoverCloseButton />
                      <PopoverBody>
                        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                          <ProductsInfo products={item.attributes.products.data} />
                        </SimpleGrid>
                      </PopoverBody>
                    </PopoverContent>
                  </Portal>
                </Popover>
              </Td>
            </Tr>
          );
        })
      }
    </>
  );
};

