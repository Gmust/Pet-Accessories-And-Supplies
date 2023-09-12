import { FilterCheckbox } from '@/src/components/ShopPage/FiltersBar/FilterCheckbox';
import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface FilterAccordionItemProps {
  title: string;
  data: any[];
  label: string,
  setFilterOption: Dispatch<SetStateAction<string[]>>,
}


export const FilterAccordionItem = ({ title, data, label, setFilterOption }: FilterAccordionItemProps) => {


  return (
    <AccordionItem>
      <h3>
        <AccordionButton>
          <Text>{title}</Text>
          <AccordionIcon />
        </AccordionButton>
      </h3>
      <AccordionPanel>
        <VStack alignItems='flex-start' justifyContent='center'>
          {data.map((item) =>
            <FilterCheckbox name={item.attributes.name} id={item.id} label={label} key={item.id}
                            setFilterOption={setFilterOption} />,
          )}
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
};

