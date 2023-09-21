import { ProductCard } from '@/src/shared/ProductCard';
import { Product } from '@/types';

interface ProductsInfoProps {
  products: Product[];
}

export const ProductsInfo = ({ products }: ProductsInfoProps) => {
  return (
    <>
      {products.map((product) => <ProductCard id={product.id} product_type={product.attributes.product_type}
                                              name={product.attributes.name} brand={product.attributes.brand}
                                              uuid={product.attributes.uuid}
                                              coverPicture={product.attributes.coverPicture}
                                              price={product.attributes.price}
                                              reviews={product.attributes.reviews} />)}
    </>
  );
};

