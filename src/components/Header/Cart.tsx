'use client';

import { cartService } from '@/src/services/cartService';
import { SmallProductCard } from '@/src/shared/SmallProductCard';
import { CartResponse } from '@/types';
import { CircularProgress } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface CartParams {

}

export const Cart = ({}: CartParams) => {

  const [cart, setCart] = useState<CartResponse | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();

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
        <div>
          {session ?
            cart?.data.attributes.products.data.map((item) =>
              <SmallProductCard key={item.id} brand={item.attributes.brand} name={item.attributes.name}
                                product_type={item.attributes.product_type} coverPicture={item.attributes.coverPicture}
                                reviews={item.attributes.reviews} price={item.attributes.price} id={item.id} />,
            )
            :
            <div>Create account to continue shopping</div>
          }
        </div>
      }
    </>

  );
};

