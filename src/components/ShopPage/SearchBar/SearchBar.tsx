'use client';

import { FiltersBar } from '@/src/components/ShopPage/FiltersBar/FiltersBar';
import { goodsService } from '@/src/services/goodsService';
import { GoodsOption } from '@/types/react-select';
import {
  Box,
  Button,
  FormControl,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RiFilterFill } from 'react-icons/ri';

interface SearchBarProps {
  brands: BrandsResponse;
  productTypes: ProductTypesResponse;
}


export const SearchBar = ({ brands, productTypes }: SearchBarProps) => {


  const [options, setOptions] = useState<GoodsOption[]>();
  const [searchInput, setSearchInput] = useState<string>('');
  const [searchOption, setSearchOption] = useState<GoodsOption | null>(null);
  const router = useRouter();

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
  };

  const handleSearchOptionChanges = (selectedOption: Pick<GoodsOption, 'value' | 'label'>) => {
    router.push(`/product/${selectedOption.value}`);
  };

  useEffect(() => {
    const fetchGoods = async () => {
      if (!searchInput) return;
      try {
        const resp = await goodsService.getProductsBySearchTerm(searchInput);
        if (!resp) return;
        const options: GoodsOption[] = resp.data.map(elem => {
          return {
            label: elem.attributes.name,
            value: elem.id.toString(),
          };
        });
        setOptions(options);
      } catch (e) {
        console.log(e);
      }
    };
    fetchGoods();
  }, [searchInput]);

  return (
    <>
      <FormControl p={4} size='md' width='4xl'>
        <Select
          isMulti={false}
          name='colors'
          options={options}
          placeholder='Find goods...'
          closeMenuOnSelect={true}
          onInputChange={handleSearchInputChange}
          // @ts-ignore
          onChange={handleSearchOptionChanges}
        />
      </FormControl>
      <Box display={{ base: 'flex', md: 'none' }}>
        <Popover>
          <PopoverTrigger>
            <Button>
              <RiFilterFill style={{fontSize: '20px'}}/>
            </Button>
          </PopoverTrigger>
          <Portal>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <FiltersBar brands={brands} productTypes={productTypes} />
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </Box>
    </>
  );
};

