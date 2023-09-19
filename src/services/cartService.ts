import { $unAuthHost } from '@/src/services/index';

export const cartService = {
  async createCart(userId: number) {
    const { data } = await $unAuthHost.post('/carts', {
      data: {
        user: userId,
      },
    });
    return data;
  },

};