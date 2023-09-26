'use client';

import { CartContext } from '@/context';
import { cartService } from '@/src/services/cartService';
import { Product } from '@/types';
import { Badge, Box, Button, Flex, Heading, HStack, Progress, Text, useMediaQuery, useToast } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useContext } from 'react';
import { MdOutlineAddShoppingCart, MdOutlineRemoveShoppingCart } from 'react-icons/md';

export const AddToCart = ({ id, attributes }: Product) => {

  // const [quantity, setQuantity] = useState<number>(0);
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const toast = useToast();
  const { setCart, cart } = useContext(CartContext);
  const { data: session } = useSession();
  const newProduct = { id, attributes };

  const handleAddToCart = async () => {
    try {
      const newData = {
        ...cart,
        data: {
          ...cart?.data,
          attributes: {
            ...cart?.data.attributes,
            products: {
              data: [...cart?.data.attributes.products.data!, newProduct], // Add the new item to the array
            },
          },
        },
      };
      //@ts-ignore
      setCart(newData);
      //@ts-ignore
      const res = await cartService.updateCartProducts(
        session?.user.jwt!, newData.data.attributes.products.data.map((item) => item.id), cart!.data.id,
      );
      toast({
        title: 'Success',
        description: 'Item added to the cart',
        status: 'success',
      });
    } catch (e) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
      });
    }
  };

  const handleRemoveFromCart = async (id: number) => {
    try {
      const newData = {
        ...cart,
        data: {
          ...cart?.data,
          attributes: {
            ...cart?.data.attributes,
            products: {
              data: cart?.data.attributes.products.data.filter((item) => item.id !== id), // Return products without product with provided id
            },
          },
        },
      };
      //@ts-ignore
      setCart(newData);
      //@ts-ignore
      const res = await cartService.updateCartProducts(
        session?.user.jwt!, newData.data.attributes.products.data!.map((item) => item.id), cart!.data.id,
      );
      toast({
        title: 'Success',
        description: 'Item removed from the cart',
        status: 'success',
      });
    } catch (e) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
      });
    }
  };

  return (
    <Flex borderRadius='6px' w='90%' align='center' justify='space-between' backgroundColor='lightblue' padding='3'>
      <HStack spacing='2' alignItems='center'>
        <Box position='relative' w='45px' h='55px'>
          <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${attributes.coverPicture.data.attributes.url}`}
                 alt={'product cov  er image'} fill />
        </Box>
        <Box>
          <HStack spacing='2' align='center'>
            <Heading size='sm'>{attributes.brand.data.attributes.name}</Heading>
            <Text display={{ base: 'none', md: 'inline' }}>{attributes.name}</Text>
          </HStack>
          <Badge colorScheme='green' variant='outline'>{attributes.product_type.data.attributes.name}</Badge>
        </Box>
      </HStack>
      <HStack spacing='5'>
        {/*<HStack spacing='2' align='center'>*/}
        {/*  <Text>Qty:</Text>*/}
        {/*  <Text fontSize='xl' cursor='pointer'><CiSquareMinus /></Text>*/}
        {/*  <Text fontSize='2xl' marginBottom='1'><Kbd>{quantity}</Kbd></Text>*/}
        {/*  <Text fontSize='xl' cursor='pointer'><CiSquarePlus /></Text>*/}
        {/*</HStack>*/}
        {
          cart ? (cart.data?.attributes.products.data.filter((item) => item.id === id).length > 0 ?
              (isLargerThan800 ?
                <Button colorScheme='red' p='2' onClick={() => handleRemoveFromCart(id)}>
                  Remove from cart
                </Button>
                :
                <Text fontSize='3xl' color='black'>
                  <MdOutlineRemoveShoppingCart onClick={() => handleRemoveFromCart(id)} />
                </Text>)
              :
              (isLargerThan800 ?
                <Button colorScheme='yellow' p='2' onClick={() => handleAddToCart()}>ADD TO CART</Button>
                :
                <Text fontSize='3xl' color='black'>
                  <MdOutlineAddShoppingCart onClick={() => handleAddToCart()} />
                </Text>))
            :
            <Progress size='xs' isIndeterminate />
        }

      </HStack>
    </Flex>
  );
};

