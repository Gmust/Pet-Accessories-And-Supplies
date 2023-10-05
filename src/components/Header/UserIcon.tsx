import { Menu, MenuButton, MenuGroup, MenuItem, MenuList } from '@chakra-ui/menu';
import { IconButton } from '@chakra-ui/react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { RxAvatar } from 'react-icons/rx';

interface UserIcon {
  email: string;
  id: number;
}

export const UserIcon = ({ email, id }: UserIcon) => {

  const router = useRouter();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<RxAvatar style={{ fontSize: '36px' }} />}
        variant='unstyled'
        data-testid='user-icon-inside'
      />
      <MenuList>
        <MenuGroup title={email}>
          <MenuItem onClick={() => router.push(`/user/${id}`)}  data-testid='accountLink'>My account</MenuItem>
          <MenuItem onClick={() => router.push(`/user/${id}/orders`)} data-testid='ordersLink'>My orders</MenuItem>
        </MenuGroup>
        <MenuItem onClick={() => {
          signOut();
          router.refresh();
        }}>
          Sign out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

