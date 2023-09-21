'use client';

import { Product, ProductData } from '@/types';
import { Box, Card, CardBody, CardFooter, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { BsCurrencyDollar } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';

export const ProductCard = ({
                              product_type,
                              name,
                              reviews,
                              coverPicture,
                              brand,
                              price,
                              uuid,
                              id,
                            }: Omit<ProductData, 'additionalInfo' | 'additionalImages' | 'description'> & Pick<Product, 'id'>) => {

  const summaryRating = reviews.data && reviews.data.reduce((previousValue, currentValue) => previousValue + currentValue.attributes.rating, 0) / reviews.data.length;

  return (
    <Link href={`/product/${id}`}>
      <Card sx={{
        transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
          opacity: 0.7,
        },
      }} marginTop='4' marginLeft='3' width={{ md: '225px', base: '180px' }} flexGrow={1}>
        <CardBody>
          <Box rounded={'lg'} pos={'relative'} height={'150px'} m='1'>
            <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${coverPicture.data.attributes.url}`}
                   alt='product image'
                   fill={true} />
          </Box>
          <VStack align='center'>
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              {brand.data.attributes.name}
            </Text>
            <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500} noOfLines={[1, 2]}>
              {name}
            </Heading>;
          </VStack>
        </CardBody>
        <CardFooter>
          <Flex justify='space-between' w='full'>
            <Flex align='center'>
              <Text fontWeight={800} fontSize={'xl'}>
                {price}
              </Text>
              <Text fontSize='xl' fontWeight={800}>
                <BsCurrencyDollar />
              </Text>
            </Flex>
            <Flex align='center'>
              {
                summaryRating ? <Text fontWeight={800} fontSize={'xl'}>{summaryRating}/5
                  </Text>
                  : <Text fontWeight={800} fontSize={'xl'}>0/5</Text>
              }
              <FaStar style={{ color: 'yellow', fontSize: '20px' }} />
            </Flex>
          </Flex>
        </CardFooter>
      </Card>
    </Link>
  );
};
