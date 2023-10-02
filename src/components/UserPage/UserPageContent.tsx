'use client';

import { NoOrders } from '@/src/components/UserPage/OrdersList/NoOrders';
import { OrdersList } from '@/src/components/UserPage/OrdersList/OrdersList';
import { ReviewsList } from '@/src/components/UserPage/ReviewsList/ReviewsList';
import { OrdersResponse, UserReviews } from '@/types';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
  VStack,
} from '@chakra-ui/react';


interface UserPageContentProps {
  ordersResponse: OrdersResponse,
  userReviews: UserReviews
}

export const UserPageContent = ({ userReviews, ordersResponse }: UserPageContentProps) => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple width={['380px','md', 'full']}>
      <VStack spacing='12'>
        <AccordionItem w='full'>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                <Text fontSize='xl'> Your orders</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {
              ordersResponse?.data.length! > 0 ?
                <OrdersList data={ordersResponse?.data!} meta={ordersResponse?.meta!} />
                :
                <div>
                  <NoOrders />
                </div>
            }
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem w='full'>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                <Text fontSize='xl'> Your reviews</Text>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {
              userReviews.data.length > 0 ?
                <ReviewsList reviews={userReviews} />
                :
                null
            }
          </AccordionPanel>
        </AccordionItem>
      </VStack>
    </Accordion>
  );
};

