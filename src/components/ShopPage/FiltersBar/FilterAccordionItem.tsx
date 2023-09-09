import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Radio,
  RadioGroup,
  Text,
} from '@chakra-ui/react';

interface FilterAccordionItemProps {
  title: string;
  data: any[];
}


export const FilterAccordionItem = ({ title, data }: FilterAccordionItemProps) => {
  return (
    <AccordionItem>
      <h3>
        <AccordionButton>
          <Text>{title}</Text>
          <AccordionIcon />
        </AccordionButton>
      </h3>
      <AccordionPanel>
        <RadioGroup display='flex' flexDirection='column'>
          {data.map((item) => <Radio key={item.id}>{item.attributes.name}</Radio>)}
        </RadioGroup>
      </AccordionPanel>
    </AccordionItem>
  );
};

