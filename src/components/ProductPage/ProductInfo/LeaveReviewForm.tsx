'use client';

import { reviewsService } from '@/src/services/reviewsService';
import { Box, Button, Textarea, useToast, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface LeaveReviewFormProps {
  productId: number;
  onClose: () => void;
}


export const LeaveReviewForm = ({ productId, onClose }: LeaveReviewFormProps) => {

  const { data: session } = useSession();

  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [review, setReview] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const toast = useToast();

  const handleSubmitReview = async () => {
    setIsLoading(true);
    if (!rating && !review) {
      setErrorMsg('Enter review text and set rating!');
      return;
    }
    try {
      const res = reviewsService.createReview({
        product: productId,
        jwt: session?.user.jwt!,
        user: session?.user.id!,
        text: review,
        rating: rating,
      });
      onClose();
      toast({
        title: 'Success',
        description: 'Your review has been added',
        status: 'success',
      });
    } catch (e) {
      toast({
        title: 'Error',
        description: 'Something went wrong, reload page or try again later',
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <VStack justify='center' align='center' spacing={8}>
      <Textarea
        isRequired={true}
        placeholder='Enter review'
        size='lg'
        height='150px'
        isInvalid={!!errorMsg}
        resize='none'
        value={review}
        onChange={(e) => setReview(e.currentTarget.value)}
      />
      <Box>
        {[...Array(5)].map((star, index) => {
            index += 1;
            return (
              <button type='button' key={index}
                      onClick={() => setRating(index)}
                      onMouseEnter={() => setHover(index)}
                      onMouseLeave={() => setHover(rating)}
              >
                {
                  index <= (hover || rating) ?
                    <AiFillStar style={{ color: 'yellow', fontSize: '40px' }} />
                    :
                    <AiOutlineStar style={{ color: 'yellow', fontSize: '40px' }} />
                }
              </button>
            );
          },
        )}
      </Box>
      <Button w='full' colorScheme='yellow' isDisabled={!rating || !review} onClick={handleSubmitReview}
              isLoading={isLoading}>
        Submit
      </Button>
    </VStack>
  );
};

