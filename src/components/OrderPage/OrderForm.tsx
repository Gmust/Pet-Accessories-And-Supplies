'use client';

import { CartContext } from '@/context';
import { Order } from '@/types';
import { Box, CircularProgress, Flex, Heading, Input, InputGroup, InputLeftAddon, Kbd, Stack } from '@chakra-ui/react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { BsSignpost2 } from 'react-icons/bs';
import { GiCornerFlag } from 'react-icons/gi';
import { LiaCitySolid } from 'react-icons/lia';


type OrderFormInputs = Pick<Order, 'country' | 'city' | 'address'>

export const OrderForm = () => {

  const { order, cart } = useContext(CartContext);
  const { handleSubmit, register, setError, formState: { errors } } = useForm<OrderFormInputs>({ mode: 'onBlur' });


  const onSubmit = ({ city, country, address }: OrderFormInputs) => {

  };

  return (
    <>
      {
        order ?
          <Box mt='10'>
            <Heading>Complete your order</Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <InputGroup>
                  <InputLeftAddon pointerEvents='none'>
                    <GiCornerFlag style={{ fontSize: '40px', color: 'black' }} />
                  </InputLeftAddon>
                  <Input type='tel' placeholder='Enter your country' />
                </InputGroup>

                <InputGroup>
                  <InputLeftAddon>
                    <LiaCitySolid style={{ fontSize: '40px', color: 'black' }} />
                  </InputLeftAddon>
                  <Input placeholder='Enter your city' />
                </InputGroup>


                <InputGroup>
                  <InputLeftAddon>
                    <BsSignpost2 style={{ fontSize: '40px', color: 'black' }} />
                  </InputLeftAddon>
                  <Input placeholder='Enter your street' />
                </InputGroup>
              </Stack>
            </form>
            <Box>

            </Box>
            <Flex justifyContent='space-between'>
              <Flex>
                <Heading fontSize='xl'>Total amount:</Heading>
                <Kbd size='xl'>{order.attributes.amount} pcs.</Kbd>
              </Flex>
              <Flex>
                <Heading fontSize='xl'>Total price:</Heading>
                <Kbd size='xl'>{order.attributes.totalPrice}$</Kbd>
              </Flex>
            </Flex>
          </Box>
          :
          <Box my='auto'>
            <CircularProgress isIndeterminate color='green.300' size='100px' />
          </Box>
      }
    </>

  );
};

