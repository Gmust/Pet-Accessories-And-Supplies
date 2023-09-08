'use client';

import { Button, useMediaQuery } from '@chakra-ui/react';
import Link from 'next/link';

export const CatalogButton = () => {
  return (
    <Link href='/shop'>
        <Button colorScheme='yellow' variant='solid' size='lg'>
          Catalog
        </Button>
    </Link>
  );
};

