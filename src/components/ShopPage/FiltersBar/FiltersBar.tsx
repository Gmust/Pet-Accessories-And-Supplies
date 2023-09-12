'use client';

import { FilterAccordionItem } from '@/src/components/ShopPage/FiltersBar/FilterAccordionItem';
import { queryStringGenerator } from '@/src/utils/queryStringGenerator';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  Heading,
  NumberInput,
  NumberInputField,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface FiltersBarProps {
  brands: BrandsResponse;
  productTypes: ProductTypesResponse;
}


export const FiltersBar = ({ brands, productTypes }: FiltersBarProps) => {


  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(10000);

  const [brandsFilterOptions, setBrandsFilterOption] = useState<string[]>([]);
  const [productTypesOptions, setProductTypesFilterOption] = useState<string[]>([]);
  const [filtersQuert, setFiltersQuery] = useState<string>('');
  const router = useRouter();

  const handleUseFilters = () => {
    // if (!filtersStr) return;
    // router.push(`/shop/search/${filtersStr}`);
    if (brandsFilterOptions.length > 0 && productTypesOptions.length <= 0) {
      setFiltersQuery(queryStringGenerator({ queryValues: brandsFilterOptions, customName: 'brand' }));
    }
    if (brandsFilterOptions.length <= 0 && productTypesOptions.length > 0) {
      setFiltersQuery(queryStringGenerator({ queryValues: productTypesOptions, customName: 'product_type' }));
    }
    if (brandsFilterOptions && productTypesOptions) {
      const firstPart = queryStringGenerator({ queryValues: brandsFilterOptions, customName: 'brand' });
      const secondPart = queryStringGenerator({ queryValues: productTypesOptions, customName: 'product_type' });
      console.log(`${firstPart}&${secondPart}`);
    }
  };


  const handleMinValueChange = (val: any) => {
    setMinValue(val);
  };

  const handleMaxValueChange = (val: any) => {
    setMaxValue(val);
  };

  return (
    <Flex border='1px solid black' borderRadius='16px' p='4' direction='column'>
      <Heading fontSize='2xl' margin='1'>Select suitable filters</Heading>
      <Accordion allowMultiple={true}>
        <FilterAccordionItem title={'Brands'} data={brands.data} label='brand'
                             setFilterOption={setBrandsFilterOption} />
        <FilterAccordionItem title={'Product types'} data={productTypes.data} label='product_type'
                             setFilterOption={setProductTypesFilterOption} />
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
                colorScheme='teal'
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
      <Button marginTop='10px' colorScheme='yellow' onClick={handleUseFilters}>
        Use filters
      </Button>
    </Flex>
  );
};

