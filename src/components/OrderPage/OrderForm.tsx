'use client';

import { CartContext } from '@/context';
import { OrderInfo } from '@/src/components/OrderPage/OrderInfo';
import { ProductsTabs } from '@/src/components/OrderPage/ProductsTabs';
import { cartService } from '@/src/services/cartService';
import { ordersService } from '@/src/services/ordersService';
import { Order } from '@/types';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { Session } from 'next-auth';
import { redirect, useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsSignpost2 } from 'react-icons/bs';
import { GiCornerFlag } from 'react-icons/gi';
import { LiaCitySolid } from 'react-icons/lia';


type OrderFormInputs = Pick<Order, 'country' | 'city' | 'address'>

export const OrderForm = ({ session }: { session: Session }) => {

  const { order, cart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  if (!order) redirect('/shop');
  const { handleSubmit, register, setError, formState: { errors } } = useForm<OrderFormInputs>({ mode: 'onBlur' });
  const router = useRouter();

  const onSubmit = async ({ city, country, address }: OrderFormInputs) => {
    setIsLoading(true);
    try {
      const res = await ordersService.createOrder({
        userId: session.user.id,
        jwt: session.user.jwt!,
        order: {
          products: order.attributes.products,
          amount: order.attributes.products.data.length!,
          country: country,
          address: address,
          city: city,
          totalPrice: order.attributes.totalPrice,
          confirmed: false,
        },
      });
      await cartService.updateCartProducts(session.user.jwt!, [], cart?.data.id!);
      router.push(`order/confirm?userId=${session.user.id}`);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {
        order ?
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing='6' w='full'>
              <Heading>Complete your order</Heading>
              <Stack spacing='6'>
                <FormControl isInvalid={!!errors.country}>
                  <InputGroup width='96'>
                    <InputLeftAddon pointerEvents='none'>
                      <GiCornerFlag style={{ fontSize: '40px', color: 'black' }} />
                    </InputLeftAddon>
                    <Input
                      type='text'
                      placeholder='Enter your country'
                      {...register('country', { required: true, pattern: /[a-zA-Z]{2,}/ })} />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.country && errors.country.message}
                    {errors.country?.type === 'pattern' && 'Invalid country name'}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.city}>
                  <InputGroup>
                    <InputLeftAddon>
                      <LiaCitySolid style={{ fontSize: '40px', color: 'black' }} />
                    </InputLeftAddon>
                    <Input
                      placeholder='Enter your city'
                      type='text'
                      {...register('city', {
                        required: true,
                        pattern: /^[a-zA-Z\u0080-\u024F]+(?:([\ \-\']|(\.\ ))[a-zA-Z\u0080-\u024F]+)*$/,
                      })} />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.city && errors.city.message}
                    {errors.city?.type === 'pattern' && 'Invalid city name'}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.address}>
                  <InputGroup>
                    <InputLeftAddon>
                      <BsSignpost2 style={{ fontSize: '40px', color: 'black' }} />
                    </InputLeftAddon>
                    <Input
                      placeholder='Enter your address'
                      type='text'
                      {...register('address', {
                        required: true,
                        pattern: /^\s*\S+(?:\s+\S+){2}/,
                      })} />
                  </InputGroup>
                  <FormErrorMessage>
                    {errors.address && errors.address.message}
                    {errors.address?.type === 'pattern' && 'Invalid address'}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
              <ProductsTabs products={cart?.data.attributes.products.data!} />
              <OrderInfo amount={order.attributes.amount} totalPrice={order.attributes.totalPrice} />
              <Button type='submit' colorScheme='teal' size='lg' isLoading={isLoading}>
                Confirm order
              </Button>
            </VStack>
          </form>
          :
          <Box my='auto'>
            <CircularProgress isIndeterminate color='green.300' size='100px' />
          </Box>
      }
    </>
  );
};

