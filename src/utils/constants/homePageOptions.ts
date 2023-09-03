import { IconType } from 'react-icons';
import { BiSolidDog } from 'react-icons/bi';
import { FaCat } from 'react-icons/fa';
import { GiCat, GiSittingDog } from 'react-icons/gi';
import { LuBird, LuFish, LuRat } from 'react-icons/lu';

export interface HomePageOptions {
  id: number,
  title: string,
  Icon: IconType[]
}

export const homePageOptions: HomePageOptions[] = [
  {
    id: 1,
    Icon: [GiCat],
    title: 'Cats',
  },
  {
    id: 2,
    Icon: [GiSittingDog],
    title: 'Dogs',
  },
  {
    id: 3,
    Icon: [FaCat, BiSolidDog],
    title: 'Kittens and Puppies',
  },
  {
    id: 4,
    Icon: [LuBird, LuFish, LuRat],
    title: 'Other pets',
  },
];