'use client';

import { RatingPopover } from '@/src/components/ProductPage/ProductInfo/RatingPopover';
import { ProductData } from '@/types';
import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Badge, Divider, Flex, Heading, Kbd, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import { FcRegisteredTrademark } from 'react-icons/fc';


export const ProductInfo = ({
                              product_type,
                              reviews,
                              additionalInfo,
                              brand,
                              name,
                              price,
                              description,
                              id,
                            }: ProductData & { id: number }) => {

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
              {brand.data.attributes.name}
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
        <Badge colorScheme='green' variant='outline'>{product_type.data.attributes.name}</Badge>
        <Divider orientation='vertical' colorScheme='facebook' variant='solid' />
        <RatingPopover starsArr={starsArr} productSummaryRating={productSummaryRating} reviews={reviews} productId={id} />
      </Flex>
      <Flex direction='column'>
        <Heading size='md' marginTop='3'>
          Description
        </Heading>
        <Text width='350px' wordBreak='break-word'>
          {description}
        </Text>
      </Flex>
      <Flex direction='column' height='full'>
        <Heading marginTop='3' size='md'>Additional info</Heading>
        {
          additionalInfo ? <UnorderedList>
              {additionalInfo.basicIngredients.map((ingredient, index) => <ListItem key={index}>{ingredient}</ListItem>)}
            </UnorderedList>
            :
            <Alert status='info' p='10' mt='5'>
              <AlertIcon />
              No additional data provided
            </Alert>
        }
      </Flex>
    </Flex>
  );
};

