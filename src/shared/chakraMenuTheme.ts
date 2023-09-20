import { menuAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(menuAnatomy.keys)

// define the base component styles
const baseStyle = definePartsStyle({
  // define the part you're going to style
  button: {
    // this will style the MenuButton component
    fontWeight: 'medium',
    bg: 'gray.300',
    color: 'black',
    _hover: {
      bg: 'gray.300',
      color: 'white',
    },
  },
  list: {
    // this will style the MenuList component
    py: '4',
    borderRadius: 'xl',
    border: 'none',
    bg: 'gray.300',
  },
  item: {
    // this will style the   MenuItem and MenuItemOption components\
    bg: 'gray.300',
    color: 'black',
    _hover: {
      bg: 'gray.200',
    },
    _focus: {
      bg: 'gray.200',
    },
  },
  groupTitle: {
    textTransform: 'uppercase',
    color: 'black',
    textAlign: 'center',
    letterSpacing: 'wider',
    opacity: '0.7',
  },
  command: {
    opacity: '0.8',
    fontFamily: 'mono',
    fontSize: 'sm',
    letterSpacing: 'tighter',
    pl: '4',
  },
  divider: {
    my: '4',
    borderColor: 'black',
    borderBottom: '2px dotted',
  },
})
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle })