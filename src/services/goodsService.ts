import { $unAuthHost } from '@/src/services/index';
import { GoodsResponse } from '@/types';

export const goodsService = {
  async getProducts() {
    try {
      const { data } = await $unAuthHost.get<GoodsResponse>('/products?populate=coverPicture&populate=reviews');
      return data
    } catch (e) {
      console.log(e);
    }
  },

};