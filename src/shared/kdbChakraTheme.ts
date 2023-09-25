import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const xl = defineStyle({
  fontSize: 'xl',
})

export const kbdTheme = defineStyleConfig({
  sizes: { xl },
})