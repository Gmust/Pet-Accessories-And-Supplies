'use client';

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Text,
} from '@chakra-ui/react';

export const FiltersBar = () => {
  return (
    <Flex border='1px solid black' direction='column'>
      <Heading fontSize='2xl'>Select suitable filters</Heading>
      <Accordion allowMultiple={true}>
        <AccordionItem>
          <h3>
            <AccordionButton>
              <Text>Brands</Text>
            </AccordionButton>
          </h3>
          <AccordionPanel>
            <RadioGroup display='flex' flexDirection='column'>
              <Radio>
                Brand 1
              </Radio>
              <Radio>
                Brand 2
              </Radio>
              <Radio>
                Brand 3
              </Radio>
              <Radio>
                Brand 4
              </Radio>
            </RadioGroup>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

