'use client';

import { ProductData } from '@/types';
import { Box, Center, Flex, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

export const ProductCard = ({
                              productType,
                              name,
                              reviews,
                              coverPicture,
                              brand,
                              price,
                              uuid,
                            }: Omit<ProductData, 'additionalInfo' | 'additionalImages' | 'description'>) => {

  const summaryRating = reviews.data && reviews.data.reduce((previousValue, currentValue) => previousValue + currentValue.attributes.rating, 0) / reviews.data.length;

  return (
    <Center marginX='2' marginTop='6'>
      <Link href={`/shop/product/${uuid}`}>
        <Box
          role={'group'}
          p={6}
          maxW={'240px'}
          height='380px'
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}
          cursor={'pointer'}
          sx={{
            transition: 'transform 0.2s ease-in-out, opacity 0.2s ease-in-out', // Add transitions for both transform and opacity
            '&:hover': {
              transform: 'scale(1.05)',
              opacity: 0.7,
            },
          }}>
          <Box
            rounded={'lg'}
            pos={'relative'}
            height={'150px'}
          >
            <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${coverPicture.data.attributes.url}`} alt='product image'
                   fill={true} />
          </Box>
          <Stack pt={10} align={'center'} position='relative' h='full'>
            <Text color={'gray.500'} fontSize={'sm'} textTransform={'uppercase'}>
              {brand}
            </Text>
            <Heading fontSize={'xl'} fontFamily={'body'} fontWeight={500}>
              {name}
            </Heading>;
            <Flex direction={'row'} align={'flex-end'}  justify='space-between'
                  width={'full'}>
              <Text fontWeight={800} fontSize={'xl'}>
                {price}
              </Text>
              <Flex alignItems='center' justify='space-between' >
                {
                  summaryRating ? <Text fontWeight={800} fontSize={'xl'}>{summaryRating}/5
                    </Text>
                    : <Text fontWeight={800} fontSize={'xl'}>0/5</Text>
                }
                <FaStar style={{ color: 'yellow', fontSize: '20px' }} />
              </Flex>
            </Flex>;
          </Stack>
        </Box>
      </Link>
    </Center>
  )
    ;
};
