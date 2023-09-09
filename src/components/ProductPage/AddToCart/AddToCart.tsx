'use client';

import { Badge, Box, Button, Flex, Heading, HStack, Kbd, Text, useMediaQuery } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';
import { MdOutlineAddShoppingCart } from 'react-icons/md';

export const AddToCart = ({
                            coverPicture,
                            name,
                            brand,
                            product_type,
                          }: Pick<ProductData, 'coverPicture' | 'name' | 'brand' | 'product_type'>) => {

  const [quantity, setQuantity] = useState<number>(0);
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)');
  return (
    <Flex borderRadius='6px' w='90%' align='center' justify='space-between' backgroundColor='lightblue' padding='3'>
      <HStack spacing='2' alignItems='center'>
        <Box position='relative' w='45px' h='55px'>
          <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${coverPicture.data.attributes.url}`}
                 alt={'product cov  er image'} fill />
        </Box>
        <Box>
          <HStack spacing='2' align='center'>
            <Heading size='sm'>{brand.data.attributes.name}</Heading>
            <Text display={{ base: 'none', md: 'inline' }}>{name}</Text>
          </HStack>
          <Badge colorScheme='green' variant='outline'>{product_type.data.attributes.name}</Badge>
        </Box>
      </HStack>
      <HStack spacing='5'>
        <HStack spacing='2' align='center'>
          <Text>Qty:</Text>
          <Text fontSize='xl' cursor='pointer'><CiSquareMinus /></Text>
          <Text fontSize='2xl' marginBottom='1'><Kbd>{quantity}</Kbd></Text>
          <Text fontSize='xl' cursor='pointer'><CiSquarePlus /></Text>
        </HStack>
        {
          isLargerThan800 ?
            <Button colorScheme='yellow' p='1'>ADD TO CART</Button>
            :
            <Text fontSize='3xl' color='black'>
              <MdOutlineAddShoppingCart />
            </Text>
        }
      </HStack>
    </Flex>
  );
};

