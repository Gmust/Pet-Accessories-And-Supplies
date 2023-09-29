import { Review } from '@/types';
import { Divider, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';


export const ReviewCard = ({ id, attributes }: Pick<Review, 'id' | 'attributes'>) => {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const time = new Date(attributes.createdAt).toLocaleDateString();

  return (
    <Flex key={id} flexDirection='column' marginY='4'
          sx={{ border: '1px solid', borderColor: 'gray.200', borderRadius: 'md' }}
          padding={2}>
      <Flex justifyContent='flex-start' align='center'>
        <Text fontSize='xl'>
          {attributes.rating}/ 5
        </Text>
        <FaStar style={{ color: 'yellow', fontSize: '20px', marginLeft: '5px' }} />
      </Flex>
      <Divider />
      <Flex flexDirection='column'>
        <Text noOfLines={isOpen ? 100 : 3} onClick={() => setIsOpen(!isOpen)}>
          {attributes.text}
        </Text>
        <Text color='gray.400' textAlign='right'>
          {time}
        </Text>
      </Flex>
    </Flex>
  );
};

