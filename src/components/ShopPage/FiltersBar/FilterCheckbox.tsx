import { Checkbox } from '@chakra-ui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react';

interface FilterCheckboxProps {
  name: string,
  id: string,
  label: string,
  setFilterOption: Dispatch<SetStateAction<string[]>>,
}

export const FilterCheckbox = ({ name, id, label, setFilterOption }: FilterCheckboxProps) => {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [checked, setIsChecked] = useState<boolean>(false);


  useEffect(() => {
    const brands = searchParams.get('brands') && searchParams.get('brands')?.split('.');
    const product_types = searchParams.get('product_types') && searchParams.get('brands')?.split('.');
    if (brands && brands?.filter((item) => item === name).length > 0) {
      setIsChecked(true);
    }
    if (product_types && product_types?.filter((item) => item === name).length > 0) {
      setIsChecked(true);
    }
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!checked) {
      setFilterOption((prevState) => [...prevState, `${event.target.value}`]);
    } else if (checked) {
      setFilterOption((prevState) => prevState.filter((value) => value !== name));
    }
  };

  return (
    <Checkbox key={id} colorScheme='teal' value={name} isChecked={checked}
              onChange={(val) => {
                setIsChecked(!checked);
                handleChange(val);
              }}>
      {name}
    </Checkbox>
  );
};

