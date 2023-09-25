'use client';

import { menuTheme } from '@/src/shared/chakraMenuTheme';
import { kbdTheme } from '@/src/shared/kdbChakraTheme';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider, defineStyle, defineStyleConfig, extendTheme } from '@chakra-ui/react';
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
  components: {
    Menu: menuTheme,
    Kbd: kbdTheme
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
      <SessionProvider>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            {children}
          </ChakraProvider>
        </CacheProvider>
      </SessionProvider>
    </>
  );
};