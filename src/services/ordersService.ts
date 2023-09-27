import { $authHost } from '@/src/services/index';
import { CreatedOrderResponse, Order, OrdersResponse } from '@/types';


interface CreateOrderParams {
  jwt: string,
  userId: number
  order: Order
}

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
  async createOrder({ order, userId, jwt }: CreateOrderParams) {
    const { data } = await $authHost.post<CreatedOrderResponse>(`orders`, {
      data: {
        user: userId,
        products: order.products,
        address: order.address,
        city: order.city,
        country: order.country,
        totalPrice: order.totalPrice,
        amount: order.amount,
      },
    }, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return data;
  },
};