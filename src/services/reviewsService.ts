import { $authHost } from '@/src/services/index';
import { ReviewResponse } from '@/types';

interface CreateReview {
  jwt: string,
  product: number,
  user: number,
  text: string,
  rating: number
}

export const reviewsService = {
  async createReview({ product, rating, user, text, jwt }: CreateReview) {
    const { data } = await $authHost.post<ReviewResponse>('reviews', {
      data: {
        user,
        product,
        rating,
        text,
      },
    }, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return data;
  },
};