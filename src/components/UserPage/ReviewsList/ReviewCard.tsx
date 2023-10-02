import { reviewsService } from '@/src/services/reviewsService';
import { Review } from '@/types';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface ReviewCard {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCard) => {

  const { data: session } = useSession();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [reviewText, setReviewText] = useState<string>(review.attributes.text);
  const [rating, setRating] = useState<number>(review.attributes.rating);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();

  const handleUpdateReview = async () => {
    if (review.attributes.text === reviewText && rating === review.attributes.rating) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await reviewsService.updateReview({
        reviewId: review.id,
        productId: review.attributes.product.data.id,
        text: reviewText,
        rating,
        jwt: session?.user.jwt!,
      });
      router.refresh();
      toast({
        status: 'success',
        description: 'Review has been changed',
        title: 'Success',
      });
      setIsEditing(false);
    } catch (e) {
      console.log(e);
      toast({
        status: 'error',
        description: 'Something went wrong, try again later',
        title: 'Error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelUpdate = async () => {
    setReviewText(review.attributes.text);
    setRating(review.attributes.rating);
    setIsEditing(false);
  };


  return (
    <Card>
      <CardHeader>
        <Heading size='md'>{review.attributes.product.data.attributes.name}</Heading>
      </CardHeader>
      <CardBody display='flex' flexDirection='column' justifyContent='space-around'>
        {
          isEditing ?
            <>
              <Flex align='center' mt={3} flexDirection='column'>
                <Textarea value={reviewText} resize='none' onChange={(e) => setReviewText(e.currentTarget.value)} />
                <Flex align='center'>
                  <NumberInput variant='flushed' size='lg' keepWithinRange={true} max={5}
                               min={1} defaultValue={rating}
                               onChange={(valueAsString: string, valueAsNumber: number) => setRating(valueAsNumber)}>
                    <NumberInputField width='50px' value={rating} />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <Text fontSize='xl'>
                    /5
                  </Text>
                  <FaStar style={{ color: 'yellow', marginLeft: '5px', fontSize: '22px' }} />
                </Flex>
              </Flex>
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
              <Button colorScheme='green' variant='ghost' isLoading={isLoading} onClick={handleUpdateReview}>
                Save
              </Button>
              <Button colorScheme='red' onClick={handleCancelUpdate} variant='ghost'>
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

