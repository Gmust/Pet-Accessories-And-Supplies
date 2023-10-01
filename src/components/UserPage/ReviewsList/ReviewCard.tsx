import { Review } from '@/types';
import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, Text, Textarea } from '@chakra-ui/react';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface ReviewCard {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCard) => {

  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [reviewText, setReviewText] = useState<string>(review.attributes.text);

  return (
    <Card>
      <CardHeader>
        <Heading size='md'>{review.attributes.product.data.attributes.name}</Heading>
      </CardHeader>
      <CardBody display='flex' flexDirection='column' justifyContent='space-around'>
        {
          isEditing ?
            <>
              <Textarea value={reviewText} resize='none'/>

            </>
            :
            <>
              <Text noOfLines={isOpened ? [10] : [3]} onClick={() => setIsOpened(!isOpened)}>
                {review.attributes.text}
              </Text>
              <Flex align='center'>
                <Text fontSize='xl'>
                  {review.attributes.rating}/5
                </Text>
                <FaStar style={{ color: 'yellow', marginLeft: '5px', fontSize: '22px' }} />
              </Flex>
            </>
        }
      </CardBody>
      <CardFooter>
        {
          isEditing ?
            <Flex justifyContent='space-between' align='center' w='full'>
              <Button colorScheme='green' variant='ghost'>Save</Button>
              <Button colorScheme='red' onClick={() => setIsEditing(false)} variant='ghost'>
                Cancel
              </Button>
            </Flex>
            :
            <Button onClick={() => setIsEditing(true)}>Manage review</Button>
        }
      </CardFooter>
    </Card>
  );
};

