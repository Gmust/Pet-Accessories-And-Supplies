import { $unAuthHost } from '@/src/services/index';

export const goodsService = {
  async getProducts() {
    try {
      const { data } = await $unAuthHost.get<GoodsResponse>('/products?populate=coverPicture&populate=reviews&populate=brand');
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
      const { data } = await $unAuthHost.get<ProductResponse>(
        `products/${id}?populate=coverPicture&populate=reviews&populate=additionalImages&populate=brand&populate=product_type`,
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async getBrands() {
    try {
      const { data } = await $unAuthHost.get<BrandsResponse>(`brands`);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async getProductTypes() {
    try {
      const { data } = await $unAuthHost.get<ProductTypesResponse>(`product-types`);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async getProductsByFilters(query: string) {
    try {
      const { data } = await $unAuthHost.get<ProductTypesResponse>(`/products?${query}`);
      return data;
    } catch (e) {
      console.log(e);
    }
  },
};