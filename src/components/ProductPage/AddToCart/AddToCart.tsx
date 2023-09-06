'use client';

import { ProductData } from '@/types';
import { Badge, Box, Button, Flex, Heading, HStack, Kbd, Stack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React, { useState } from 'react';
import { CiSquareMinus, CiSquarePlus } from 'react-icons/ci';

export const AddToCart = ({
                            coverPicture,
                            name,
                            brand,
                            productType,
                          }: Pick<ProductData, 'coverPicture' | 'name' | 'brand' | 'productType'>) => {

  const [quantity, setQuantity] = useState<number>(0);

  return (
    <Flex borderRadius='6px' w='90%' align='center' justify='space-between' backgroundColor='lightblue' padding='3'>
      <HStack spacing='2' alignItems='center'>
        <Box position='relative' w='45px' h='55px'>
          <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${coverPicture.data.attributes.url}`}
                 alt={'product cover image'} fill />
        </Box>
        <Stack spacing='-1'>
          <HStack spacing='2' align='center'>
            <Heading size='sm'>{brand}</Heading>
            <Text>{name}</Text>
          </HStack>
          <Badge width='45px' colorScheme='green' variant='outline'>{productType}</Badge>
        </Stack>
      </HStack>
      <HStack spacing='5'>
        <HStack spacing='2' align='center'>
          <Text>Qty:</Text>
          <Text fontSize='xl' cursor='pointer'><CiSquareMinus /></Text>
          <Text fontSize='2xl' marginBottom='1'><Kbd>{quantity}</Kbd></Text>
          <Text fontSize='xl' cursor='pointer'><CiSquarePlus /></Text>
        </HStack>
        <Button colorScheme='yellow' p='1'>ADD TO CART</Button>
      </HStack>
    </Flex>
  );
};

