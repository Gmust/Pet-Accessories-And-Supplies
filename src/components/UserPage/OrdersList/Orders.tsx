import { DeclineOrder } from '@/src/components/UserPage/OrdersList/DeclineOrder';
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
  Td,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { GiConfirmed } from 'react-icons/gi';
import { MdOutlineNotInterested } from 'react-icons/md';

interface OrdersProps {
  order: OrderData[];
}

export const Orders = ({ order }: OrdersProps) => {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [orderId, setOrderId] = useState<number | null>(null);

  return (
    <>
      {
        order.map((item) => {
          return (
            <>
              <Tr key={item.id}>
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
                      <Button>Products List ({item.attributes.products.data.length} product/s)</Button>
                    </PopoverTrigger>
                    <Portal>
                      <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader>Products in order</PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody maxHeight='300px' overflow='auto'>
                          <ProductsInfo products={item.attributes.products.data} />
                        </PopoverBody>
                      </PopoverContent>
                    </Portal>
                  </Popover>
                </Td>
                <Td>
                  {
                    !item.attributes.confirmed ?
                      <Button variant='ghost' colorScheme='red' onClick={() => {
                        setOrderId(item.id);
                        onOpen();
                      }}>
                        Decline order
                      </Button>
                      : null
                  }
                </Td>
              </Tr>
            </>
          );
        })
      }
      <DeclineOrder isOpen={isOpen} onClose={onClose} orderId={orderId!} />
    </>
  );
};

