'use client';

import { FilterAccordionItem } from '@/src/components/ShopPage/FiltersBar/FilterAccordionItem';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';

interface FiltersBarProps {
  brands: BrandsResponse;
  productTypes: ProductTypesResponse;
}


export const FiltersBar = ({ brands, productTypes }: FiltersBarProps) => {

  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(10000);

  const handleMinValueChange = (val: any) => {
    setMinValue(val);
  };

  const handleMaxValueChange = (val: any) => {
    setMaxValue(val);
  };


  return (
    <Flex border='1px solid black' direction='column'>
      <Heading fontSize='2xl'>Select suitable filters</Heading>
      <Accordion allowMultiple={true}>
        <FilterAccordionItem title={'Brands'} data={brands.data} />
        <FilterAccordionItem title={'Product types'} data={productTypes.data} />
        <AccordionItem>
          <h3>
            <AccordionButton>
              <Text>Price</Text>
              <AccordionIcon />
            </AccordionButton>
          </h3>
          <AccordionPanel>
            <VStack spacing='30px' justify='center' align='center'>
              <Flex justifyContent='space-between' w='full'>
                <NumberInput size='md' maxW={'150px'} value={minValue} min={0} max={10000}
                             onChange={handleMinValueChange}>
                  <NumberInputField />
                </NumberInput>
                <NumberInput size='md' maxW={'150px'} value={maxValue} min={0} max={10000}
                             onChange={handleMaxValueChange}>
                  <NumberInputField />
                </NumberInput>
              </Flex>
              <RangeSlider
                aria-label={['min', 'max']}
                colorScheme='messenger'
                max={10000}
                min={0}
                value={[minValue, maxValue]}
                focusThumbOnChange={false}
                onChange={(val) => {
                  console.log(val);
                  handleMinValueChange(val[0]);
                  handleMaxValueChange(val[1]);
                }}
              >
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
                <RangeSliderThumb index={1} />
              </RangeSlider>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
};

