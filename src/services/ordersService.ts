import { $authHost } from '@/src/services/index';
import { OrdersResponse } from '@/types';


export const ordersService = {
  async getOrders(jwt: string) {
    try {
      const { data } = await $authHost.get<OrdersResponse>(`orders?populate[products][populate][0]=reviews&populate[products][populate][1]=coverPicture&populate[products][populate][2]=brand&populate[products][populate][3]=product_type`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return data;
    } catch (e) {
      console.log(e);
    }
  },
  async cancelOrder(jwt: string, orderId: number) {
    const response = await $authHost.delete(`orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response;
  },
};