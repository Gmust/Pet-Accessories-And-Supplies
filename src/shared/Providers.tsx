'use client';

import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { Rubik } from 'next/font/google';
import React from 'react';

interface ProvidersProps {
  children: React.ReactNode;
}

export const theme = extendTheme({
  fonts: {
    heading: 'var(--font-rubik)',
    body: 'var(--font-rubik)',
  },

});

const rubik = Rubik({ subsets: ['latin'] });

export const Providers = ({ children }: ProvidersProps) => {

  return (
    < >
      <style jsx global>
        {`
          :root {
            --font-rubik: ${rubik.style.fontFamily};
          }
        `}
      </style>
      <CacheProvider>
        <ChakraProvider theme={theme}>
          <SessionProvider>
            {children}
          </SessionProvider>
        </ChakraProvider>
      </CacheProvider>
    </>
  );
};