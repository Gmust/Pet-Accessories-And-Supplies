import { Checkbox } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

interface FilterCheckboxProps {
  name: string,
  id: string,
  label: string,
  setFilterOption: Dispatch<SetStateAction<string[]>>,
}

export const FilterCheckbox = ({ name, id, label, setFilterOption }: FilterCheckboxProps) => {

  const router = useRouter();
  const [checked, setIsChecked] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!checked) {
      setFilterOption((prevState) => [...prevState, `${event.target.value}`]);
    } else if (checked) {
      setFilterOption((prevState) => prevState.filter((value) => value.slice(0, -1) !== name));
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

