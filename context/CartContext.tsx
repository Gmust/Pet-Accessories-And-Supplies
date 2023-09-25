'use client';
import { CartResponse } from '@/types';
import { createContext, Dispatch, SetStateAction, useState } from 'react';


interface CartContextParams {
  cart: CartResponse | null,
  setCart: Dispatch<SetStateAction<CartResponse | null>>,
}


export const CartContext = createContext<CartContextParams>({
  setCart: () => {
  },
  cart: null,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {

  const [cart, setCart] = useState<CartResponse | null>(null);

  return (
    <CartContext.Provider value={{ cart: cart, setCart: setCart }}>
      {children}
    </CartContext.Provider>
  );
};