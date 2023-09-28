import { SmallProductCard } from '@/src/shared/SmallProductCard';
import { Product } from '@/types';

interface ProductsInfoProps {
  products: Product[];
}

export const ProductsInfo = ({ products }: ProductsInfoProps) => {
  return (
    <>
      {products.map((product) =>
        <SmallProductCard id={product.id} product_type={product.attributes.product_type}
                          name={product.attributes.name} brand={product.attributes.brand}
                          coverPicture={product.attributes.coverPicture}
                          price={product.attributes.price}
                          reviews={product.attributes.reviews} key={product.id}
                          stripeId={product.attributes.stripeId} />)}
    </>
  );
};

