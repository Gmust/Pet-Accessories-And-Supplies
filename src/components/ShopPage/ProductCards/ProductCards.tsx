'use client';


import { ProductCard } from '@/src/shared/ProductCard';
import { Flex } from '@chakra-ui/react';

export const ProductCards = ({ data }: { data: Product[] }) => {
  return (
    <Flex flexWrap='wrap' flexDirection='row' align='center' padding='2'>
      {
        data.map((product) => <ProductCard brand={product.attributes.brand} name={product.attributes.name}
                                           product_type={product.attributes.product_type}
                                           coverPicture={product.attributes.coverPicture}
                                           reviews={product.attributes.reviews} uuid={product.attributes.uuid}
                                           key={product.attributes.uuid} id={product.id}
                                           price={product.attributes.price} />)
      }
    </Flex>
  );
};

