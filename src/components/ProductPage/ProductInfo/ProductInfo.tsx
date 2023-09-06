'use client';

import { ProductData } from '@/types';
import { Badge, Divider, Flex, Heading, HStack, Kbd, ListItem, Text, UnorderedList } from '@chakra-ui/react';
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
    <Flex flexDirection='column' position='relative'>
      <Flex flexDirection='column'>
        <Flex justify='space-between' align='center'>
          <Flex>
            <Heading fontSize='2xl'>
              {brand}
            </Heading>
            <FcRegisteredTrademark />
          </Flex>
          <Text fontSize='2xl'>
            <Kbd>{price}$</Kbd>
          </Text>
        </Flex>
        <Text fontSize='xl'>
          {name}
        </Text>
      </Flex>
      <Flex mt='1' justify='space-between'>
        <Badge colorScheme='green' variant='outline'>{productType}</Badge>
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
      <Flex direction='column'>
        <Heading size='md'>
          Description
        </Heading>
        <Text width='350px' wordBreak='break-word'>
          {description}
        </Text>
      </Flex>
      <Flex direction='column'>
        <Heading size='md'>Additional info</Heading>
        <UnorderedList>
          {additionalInfo.basicIngredients.map((ingredient, index) => <ListItem key={index}>{ingredient}</ListItem>)}
        </UnorderedList>
      </Flex>

    </Flex>
  );
};

