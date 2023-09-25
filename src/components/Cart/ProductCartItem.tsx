import { SmallProductCard } from '@/src/shared/SmallProductCard';
import { Product } from '@/types';
import { RxCross1 } from 'react-icons/rx';

interface ProductCartItemProps {
  item: Product;
}

export const ProductCartItem = ({ item }: ProductCartItemProps) => {

  const handleDeleteFromCart = () => {

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

