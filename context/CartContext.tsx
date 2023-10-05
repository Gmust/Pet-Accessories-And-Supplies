'use client';
import { CartResponse, OrderData } from '@/types';
import { createContext, Dispatch, SetStateAction, useState } from 'react';


export interface CartContextParams {
  cart: CartResponse | null,
  setCart: Dispatch<SetStateAction<CartResponse | null>>,
  order: Pick<OrderData, 'attributes'> | null,
  setOrder: Dispatch<SetStateAction<Pick<OrderData, 'attributes'> | null>>
}


export const CartContext = createContext<CartContextParams>({
  setCart: () => {
  },
  cart: null,
  setOrder: () => {
  },
  order: null,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {

  const [cart, setCart] = useState<CartResponse | null>(null);
  const [order, setOrder] = useState<Pick<OrderData, 'attributes'> | null>(null);

  return (
    <CartContext.Provider value={{ cart, setCart, order, setOrder }}>
      {children}
    </CartContext.Provider>
  );
};