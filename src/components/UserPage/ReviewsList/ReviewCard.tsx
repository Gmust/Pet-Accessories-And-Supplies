import { Review } from '@/types';
import { Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface ReviewCard {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCard) => {

  return (
    <VStack borderRadius='md' border='1px solid gray' margin={2} width='400px' p={2}>
      <HStack>
        <Heading fontSize='md'>Product name:</Heading>
        <Text fontSize='md'>{review.attributes.product.data.attributes.name}</Text>
      </HStack>
      <VStack>
        <Flex>
          <Text textAlign='left' fontSize='md'>Review text:</Text>
          <Text fontSize='md' noOfLines={[1, 2]}>{review.attributes.text}</Text>
        </Flex>
        <Text fontSize='md'>{new Date(review.attributes.createdAt).toLocaleDateString()}</Text>
      </VStack>
    </VStack>
  );
};

