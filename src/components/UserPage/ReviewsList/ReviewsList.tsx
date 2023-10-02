'use client';

import { ReviewCard } from '@/src/components/UserPage/ReviewsList/ReviewCard';
import { UserReviews } from '@/types';
import {  SimpleGrid } from '@chakra-ui/react';

export const ReviewsList = ({ reviews }: { reviews: UserReviews }) => {
  return (
    <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
      {reviews.data.map((review) =>
        <ReviewCard review={review} key={review.id} />,
      )}
    </SimpleGrid>
  );
};

