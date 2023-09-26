import { $authHost } from '@/src/services/index';
import { CartResponse, Product } from '@/types';
import { User } from '@/types/auth';

export const cartService = {
  async createCart(userId: number) {
    const { data } = await $authHost.post('/carts', {
      data: {
        user: userId,
      },
    });
    return data;
  },
  async getCartInfo(jwt: string) {
    const { data } = await $authHost.get<Pick<User, 'cart'>>(`users/me?populate[cart]=deep`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return data;
  },
  async getCart(jwt: string, cartId: number) {
    const { data } = await $authHost.get<CartResponse>(`carts/${cartId}?populate=deep`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return data;
  },
  async updateCartProducts(jwt: string, cartItems: number[], cartId: number) {
    const { data } = await $authHost.put<CartResponse>(`carts/${cartId}?populate=deep,3`, {
      data: {
        products: cartItems,
      },
    }, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  },
};