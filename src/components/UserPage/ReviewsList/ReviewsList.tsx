'use client';

import { ReviewCard } from '@/src/components/UserPage/ReviewsList/ReviewCard';
import { UserReviews } from '@/types';
import { Flex } from '@chakra-ui/react';

export const ReviewsList = ({ reviews }: { reviews: UserReviews }) => {
  return (
    <Flex flexWrap='wrap' >
      {reviews.data.map((review) =>
        <ReviewCard review={review} />,
      )}
    </Flex>
  );
};

