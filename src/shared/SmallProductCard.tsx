import { Product, ProductData } from '@/types';
import { Card, CardBody, Flex, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link'
import { BsCurrencyDollar } from 'react-icons/bs';

export const  SmallProductCard = ({
                                   product_type,
                                   name,
                                   reviews,
                                   coverPicture,
                                   brand,
                                   price,
                                   id,
                                 }: Omit<ProductData, 'additionalInfo' | 'additionalImages' | 'description' | 'uuid'> & Pick<Product, 'id'>) => {

  const summaryRating = reviews.data && reviews.data.reduce((previousValue, currentValue) => previousValue + currentValue.attributes.rating, 0) / reviews.data.length;

  return (
    <Link href={`/product/${id}`}>
      <Card
        direction='row'
        variant='outline'
      >
        <CardBody display='flex' flexDirection='row' justifyContent='space-between'>
          <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${coverPicture.data.attributes.url}`}
                 alt='product image' width='50' height='50'
          />
          <Flex flexDirection='column' alignItems='flex-start' marginLeft='4'>
            <Heading fontSize='md'>{brand.data.attributes.name}</Heading>
            <Text noOfLines={1}>{name}</Text>
            <Flex align='center'>
              <Text fontWeight={800} fontSize={'md'}>
                {price}
              </Text>
              <Text fontSize='md' fontWeight={800}>
                <BsCurrencyDollar />
              </Text>
            </Flex>
          </Flex>
        </CardBody>
      </Card>
    </Link>
  );
};

