'use client';
import { ProductData } from '@/types';
import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Box, Container } from '@chakra-ui/react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styles from './productImagesSwiper.module.css';

export const ProductImagesSwiper = ({ additionalImages }: Pick<ProductData, 'additionalImages'>) => {

  const imgArr = additionalImages.data && additionalImages.data.map((img) => img.attributes.url);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function(i: number) {
      return (
        <Box position='relative' marginTop='10px' width={{ base: '30px' }}
             height={{ base: '50px' }} key={imgArr[i]}>
          <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imgArr[i]}`} fill
                 alt={imgArr[i]} />
        </Box>
      );
    },
  };


  return (
    <Container width='350px' className={styles.test} height='100%'>
      {
        additionalImages.data ?
          <Slider {...settings} >
            {additionalImages.data.map((img) =>
              <Box position='relative' width={{ base: '300px' }} height={{ base: '400px' }} key={img.id}>
                <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${img.attributes.url}`} fill
                       alt={img.attributes.name} />
              </Box>,
            )}
          </Slider>
          :
          <Alert status='info'>
            <AlertIcon />
            Seems like this product haven`t got additional images
          </Alert>
      }

    </Container>
  );
};

