import { Flex, Heading, Kbd } from '@chakra-ui/react';

interface OrderInfoProps {
  amount: number,
  totalPrice: number
}

export const OrderInfo = ({ amount, totalPrice }: OrderInfoProps) => {
  return (

    <Flex justifyContent='flex-start' alignItems='flex-start' flexDirection='column'>
      <Flex>
        <Heading fontSize='xl'>Total amount:</Heading>
        <Kbd size='xl' ml='5'>{amount} pcs.</Kbd>
      </Flex>
      <Flex mt='4'>
        <Heading fontSize='xl'>Total price:</Heading>
        <Kbd size='xl' ml='5'>{totalPrice.toFixed(2)}$</Kbd>
      </Flex>
    </Flex>
  );
};

