'use client';

import { CartContext } from '@/context';
import { ProductCartContent } from '@/src/components/Cart/ProductCartContent';
import { cartService } from '@/src/services/cartService';
import { CartResponse } from '@/types';
import { Box, CircularProgress } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useContext, useEffect, useState } from 'react';

interface CartParams {

}

export const Cart = ({}: CartParams) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();
  const { setCart, cart } = useContext(CartContext);

  useEffect(() => {
    if (session) {
      const getCartInfo = async () => {
        setIsLoading(true);
        try {
          const res = await cartService.getCartInfo(session?.user.jwt!);
          const cartData = await cartService.getCart(session?.user.jwt!, res?.cart!.id);
          setCart(cartData);
        } catch (e) {
          console.log(e);
        } finally {
          setIsLoading(false);
        }
      };
      getCartInfo();
    }
  }, [session]);


  return (
    <>
      {isLoading ?
        <CircularProgress isIndeterminate color='green.300' />
        :
        <Box>
          {session ?
            <ProductCartContent cart={cart!} />
            :
            <div>Create account to continue shopping</div>
          }
        </Box>
      }
    </>

  );
};

