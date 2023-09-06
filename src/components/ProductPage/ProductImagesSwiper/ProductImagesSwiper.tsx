'use client';
import { ProductData } from '@/types';
import { Box, Container } from '@chakra-ui/react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';


export const ProductImagesSwiper = ({ additionalImages }: Pick<ProductData, 'additionalImages'>) => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: function(i: number) {
      return (
        <>
          {additionalImages.data.map((img) =>
            <Box position='relative' width={{ base: '30px' }} height={{ base: '50px' }} key={img.id}>
              <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${img.attributes.url}`} fill
                     alt={img.attributes.name} />
            </Box>,
          )}
        </>
      );
    },
  };


  return (
    <Container width='350px'>
      <Slider {...settings} >
        {additionalImages.data.map((img) =>
          <Box position='relative' width={{ base: '300px' }} height={{ base: '400px' }} key={img.id}>
            <Image src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${img.attributes.url}`} fill
                   alt={img.attributes.name} />
          </Box>,
        )}
      </Slider>
    </Container>
  );
};

