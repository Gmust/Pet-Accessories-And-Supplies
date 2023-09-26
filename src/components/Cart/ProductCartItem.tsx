import { CartContext } from '@/context';
import { cartService } from '@/src/services/cartService';
import { SmallProductCard } from '@/src/shared/SmallProductCard';
import { Product } from '@/types';
import { useToast } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';
import { RxCross1 } from 'react-icons/rx';

interface ProductCartItemProps {
  item: Product;
}

export const ProductCartItem = ({ item }: ProductCartItemProps) => {

  const toast = useToast();
  const { setCart, cart } = useContext(CartContext);
  const { data: session } = useSession();

  const handleDeleteFromCart = async () => {
    try {
      const newData = {
        ...cart,
        data: {
          ...cart?.data,
          attributes: {
            ...cart?.data.attributes,
            products: {
              data: cart?.data.attributes.products.data.filter((product) => product.id !== item.id), // Return products without product with provided id
            },
          },
        },
      };
      //@ts-ignore
      setCart(newData);
      //@ts-ignore
      const res = await cartService.updateCartProducts(
        session?.user.jwt!, newData.data.attributes.products.data!.map((item) => item.id), cart!.data.id,
      );
      toast({
        title: 'Success',
        description: 'Item removed from the cart',
        status: 'success',
      });
    } catch (e) {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
      });
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute',
        display: 'flex',
        zIndex: 99,
        cursor: 'pointer',
        justifyContent: 'flex-end',
        width: '100%',
      }} onClick={(event) => {
        handleDeleteFromCart();
        event.preventDefault();
      }}
      >
        <RxCross1 style={{ fontSize: '40px', color: 'red', padding: '10px' }} />
      </div>
      <SmallProductCard key={item.id} brand={item.attributes.brand} name={item.attributes.name}
                        product_type={item.attributes.product_type}
                        coverPicture={item.attributes.coverPicture}
                        reviews={item.attributes.reviews} price={item.attributes.price} id={item.id} />
    </div>
  );
};

