import { $authHost } from '@/src/services/index';
import { ReviewResponse, UserReviews } from '@/types';

interface CreateReview {
  jwt: string,
  product: number,
  user: number,
  text: string,
  rating: number
}

interface UpdateReview {
  jwt: string,
  text: string,
  rating: number,
  productId: number,
  reviewId: number
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
  async getAllUserReviews(jwt: string, userId: number) {
    const { data } = await $authHost.get<UserReviews>(`reviews?filters[user][id]=${userId}&populate=deep,2`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return data;
  },
  async updateReview({ productId, text, jwt, rating, reviewId }: UpdateReview) {
    const { data } = await $authHost.put(`reviews/${reviewId}`, {
      data: {
        text,
        rating,
        product: productId,
      },
    }, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  },
};