'use client';

import { ProductData } from '@/types';
import { Container, Divider, Flex, Heading, HStack, Text } from '@chakra-ui/react';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import { FcRegisteredTrademark } from 'react-icons/fc';


export const ProductInfo = ({ productType, reviews, additionalInfo, brand, name, price, description }: ProductData) => {

  const productSummaryRating = Math.round((reviews.data.reduce((previousValue, currentValue) => previousValue + currentValue.attributes.rating, 0) / reviews.data.length) * 10) / 10;

  const starsArr = [];
  for (let i = 0; i <= productSummaryRating; i++) {
    starsArr.push([i]);
  }

  return (
    <Flex flexDirection='column'>
      <Container>
        <Flex flexDirection='column'>
          <Flex>
            <Heading fontSize='2xl'>
              {brand}
            </Heading>
            <FcRegisteredTrademark />
          </Flex>
          <Text fontSize='xl'>
            {name}
          </Text>
        </Flex>
      </Container>
      <Flex mt='1' justify='space-between'>
        <Text>{productType}</Text>
        <Divider orientation='vertical' colorScheme='facebook' variant='solid' />
        <HStack spacing='2'>
          <Flex>
            {
              starsArr.map((value, index) =>
                <FaStar style={{ color: 'yellow' }} key={index} />,
              )
            }
          </Flex>
          <Text>{productSummaryRating}</Text>
          <Text>({reviews.data.length} reviews)</Text>
        </HStack>
      </Flex>

    </Flex>
  );
};

