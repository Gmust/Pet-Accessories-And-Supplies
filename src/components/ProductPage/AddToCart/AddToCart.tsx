'use client';

import { CartContext } from '@/context';
import { Product } from '@/types';
import { Badge, Box, Button, Flex, Heading, HStack, Text, useMediaQuery } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useContext } from 'react';
import { MdOutlineAddShoppingCart, MdOutlineRemoveShoppingCart } from 'react-icons/md';

export const AddToCart = ({ id, attributes }: Product) => {

  // const [quantity, setQuantity] = useState<number>(0);
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  const { setCart, cart } = useContext(CartContext);

  const newProduct = { id, attributes };

  const handleAddToCart = async () => {
    try {
      setCart((prevState) => {
        return {
          ...prevState, // Copy existing properties
          data: {
            ...prevState?.data, // Copy existing data property
            attributes: {
              ...prevState?.data.attributes, // Copy existing attributes property
              products: {
                data: [...prevState?.data.attributes.products.data!, newProduct], // Add the new item to the array
              },
            },
          },
        }
      }

     )
    } catch (e) {

    }
  };
  console.log(cart?.data.attributes.products.data.filter((item) => item.id === id));

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
          cart?.data.attributes.products.data.filter((item) => item.id === id).length > 0 ?
            (isLargerThan800 ?
              <Button colorScheme='red' p='2' onClick={() => handleAddToCart()}>
                Remove from cart
              </Button>
              :
              <Text fontSize='3xl' color='black'>
                <MdOutlineRemoveShoppingCart onClick={() => handleAddToCart()} />
              </Text>)
            :
            (isLargerThan800 ?
              <Button colorScheme='yellow' p='2' onClick={() => handleAddToCart()}>ADD TO CART</Button>
              :
              <Text fontSize='3xl' color='black'>
                <MdOutlineAddShoppingCart onClick={() => handleAddToCart()} />
              </Text>)
        }
      </HStack>
    </Flex>
  );
};

