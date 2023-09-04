'use client';

import { Button, useMediaQuery } from '@chakra-ui/react';
import Link from 'next/link';

export const CatalogButton = () => {

  const [isLargerThan800] = useMediaQuery('(min-width: 800px)', {
    fallback: false, // return false on the server, and re-evaluate on the client side
  });

  return (
    <Link href='/shop'>
      {isLargerThan800 ?
        <Button colorScheme='yellow' variant='solid' size='lg'>
          Catalog
        </Button>
        :
        <Button colorScheme='yellow' variant='solid' size='md'>
          Catalog
        </Button>
      }

    </Link>
  );
};

