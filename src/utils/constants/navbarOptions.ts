import { IconType } from 'react-icons';
import { BiSolidUser } from 'react-icons/bi';
import { FcAbout, FcShop } from 'react-icons/fc';

interface NavbarOption {
  id: number,
  path: string,
  title: string,
  Icon: IconType
}

export const navbarOptions: NavbarOption[] = [
  {
    id: 1,
    path: '/about',
    title: 'About us',
    Icon: FcAbout,
  },
  {
    id: 2,
    path: '/shop',
    title: 'Shop',
    Icon: FcShop,
  },
];