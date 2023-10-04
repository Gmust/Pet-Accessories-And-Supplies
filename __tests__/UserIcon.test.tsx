import { UserIcon } from '@/src/components/Header/UserIcon';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


const mockUsePathname = jest.fn();
jest.mock('next/navigation', () => {
  return {
    __esModule: true,
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }),
    useSearchParams: () => ({
      get: () => {
      },
    }),
    usePathname() {
      return mockUsePathname();
    },
  };
});

describe('user icon behaviour', () => {
  it('should render with props', () => {
    const { getByText } = render(<UserIcon email='test@gmaial.com' id={1} />);
    expect(getByText('Sign out')).toBeInTheDocument();
  });
  it('should navigate to user account and user orders', async () => {
    const { getByText } = render(<UserIcon email='test@gmail.com' id={1} />);
    await userEvent.click(getByText('My account')).then(() => expect(location.pathname).to.equal('/user/1'));
    await userEvent.click(getByText('My orders')).then(() => expect(location.pathname).to.equal('/user/1/orders'));
  });
  it('should not to be rendered after sign out', async () => {
    const { container, getByText } = render(
      <UserIcon email='test@gmail.com' id={1} />,
    );
    await userEvent.click(getByText('Sign out')).then(() => expect(container).not.toBeInTheDocument());
  });
});