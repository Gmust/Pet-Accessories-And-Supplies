import { ProductCartItem } from '@/src/components/Cart/ProductCartItem';
import { CartResponse } from '@/types';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/alert';
import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';

interface ProductCartProps {
  cart: CartResponse;
}

export const ProductCartContent = ({ cart }: ProductCartProps) => {

  let totalPrice: number = 0;

  if (cart) {
    totalPrice = cart.data.attributes.products.data.reduce(
      (accumulator, currentValue) => accumulator + currentValue.attributes.price, 0);
  }

  return (
    <VStack spacing='4'>
      <Box>
        {
          cart.data.attributes.products.data.length > 0 ? cart?.data.attributes.products.data.map((item) =>
              <ProductCartItem item={item} key={item.id} />,
            )
            :
            <Alert>
              <AlertIcon />
              <AlertTitle>Cart is empty</AlertTitle>
            </Alert>
        }
      </Box>
      <Flex w='full' flexDirection='row' align='center' justify='space-between' py='2'>
        <Text color='black' fontSize='xl'>Total price:</Text>
        <Text color='black' fontSize='xl'>{totalPrice.toFixed(2)}$</Text>
      </Flex>
      <Button colorScheme='yellow' w='full' isDisabled={!(cart.data.attributes.products.data.length > 0)}>
        Confirm Order
      </Button>
    </VStack>
  );
};

