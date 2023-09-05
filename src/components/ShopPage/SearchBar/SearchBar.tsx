'use client';

import { goodsService } from '@/src/services/goodsService';
import { GoodsOption } from '@/types/react-select';
import { FormControl } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { useEffect, useState } from 'react';
import { components } from 'react-select';

const { SingleValue, Option } = components;


const IconSingleValue = (props: any) => (
  <SingleValue {...props}>
    <img src={props.data.image} style={{ height: '30px', width: '30px', borderRadius: '50%', marginRight: '10px' }} />
    {props.data.label}
  </SingleValue>
);

const IconOption = (props: any) => (
  <Option {...props}>
    <img src={props.data.image} style={{ height: '30px', width: '30px', borderRadius: '50%', marginRight: '10px' }} />
    {props.data.label}
  </Option>
);

// Step 3
const customStyles = {
  option: (provided: any) => ({
    ...provided,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  }),
};

export const SearchBar = ({}) => {


  const [options, setOptions] = useState<GoodsOption[]>();
  const [searchInput, setSearchInput] = useState<string>('');

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
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
            value: elem.attributes.uuid,
          };
        });
        console.log(options);
        setOptions(options);
      } catch (e) {
        console.log(e);
      }
    };
    fetchGoods();
  }, [searchInput]);

  return (

    <FormControl p={4}>
      <Select
        isMulti
        name='colors'
        options={options}
        placeholder='Select some colors...'
        closeMenuOnSelect={true}
        onInputChange={handleSearchInputChange}
      />
    </FormControl>
  );
};

