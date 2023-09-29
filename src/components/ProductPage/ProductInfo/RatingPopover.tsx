import { ReviewCard } from '@/src/components/ProductPage/ProductInfo/ReviewCard';
import { UnauthorizedAlert } from '@/src/shared/UnauthorizedAlert';
import { Reviews } from '@/types';
import {
  Button,
  Flex,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React from 'react';
import { FaStar } from 'react-icons/fa';

interface RatingPopoverParams {
  starsArr: any[],
  productSummaryRating: number,
  reviews: Reviews
}

export const RatingPopover = ({ starsArr, reviews, productSummaryRating }: RatingPopoverParams) => {

  const { data: session } = useSession();
  const { onClose: onAlertClose, onOpen: onAlertOpen, isOpen: isAlertOpen } = useDisclosure();
  const { onClose: onDrawerClose, onOpen: onDrawerOpen, isOpen: isDrawerOpen } = useDisclosure();

  const handleClickLeaveReview = () => {
    if (!session) {
      onAlertOpen();
    } else if (session) {
      onDrawerOpen();
    }
  };

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <HStack spacing='2' cursor='pointer'>
            <Flex>
              {
                starsArr.length ? starsArr.map((value, index) =>
                    <FaStar style={{ color: 'yellow' }} key={index} />,
                  )
                  :
                  <>
                    <FaStar style={{ color: 'gray' }} />
                    <FaStar style={{ color: 'gray' }} />
                    <FaStar style={{ color: 'gray' }} />
                    <FaStar style={{ color: 'gray' }} />
                    <FaStar style={{ color: 'gray' }} />
                  </>
              }
            </Flex>
            {productSummaryRating && <Text>{productSummaryRating}</Text>}
            <Text>({reviews.data.length} reviews)</Text>
          </HStack>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody position='relative' maxHeight='400px' overflow='auto'>
            {reviews.data.map((item) =>
              <ReviewCard id={item.id} attributes={item.attributes} key={item.id} />,
            )}
            <Button position='fixed' bottom={0} colorScheme='yellow' mb={2} onClick={handleClickLeaveReview}>
              Leave review
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <UnauthorizedAlert onClose={onAlertClose} onOpen={onAlertOpen} isOpen={isAlertOpen} />
    </>
  );
};

