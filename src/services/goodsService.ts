import { $unAuthHost } from '@/src/services/index';
import { GoodsResponse, ProductResponse } from '@/types';

export const goodsService = {
  async getProducts() {
    try {
      const { data } = await $unAuthHost.get<GoodsResponse>('/products?populate=coverPicture&populate=reviews');
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async getProductsBySearchTerm(searchTerm: string) {
    try {
      const { data } = await $unAuthHost.get<GoodsResponse>(
        `/products?filters[name][$contains]=${searchTerm}`,
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async getProduct(id: string) {
    try {
      const { data } = await $unAuthHost.get<ProductResponse>(`products/${id}?populate=coverPicture&populate=reviews&populate=additionalImages`);
      return data;
    } catch (e) {
      console.log(e);
    }
  },

};