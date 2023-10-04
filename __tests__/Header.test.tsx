import { Header } from '@/src/components/Header/Header';
import { fireEvent, getByText, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';


jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react');
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: 'Steve', jwt: 'dasdsd' },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: 'authenticated' };
    }),
  };
});

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


describe('Header Component render', () => {
  it('renders the logo', () => {
    const { getByText } = render(<Header />);
    expect(getByText('PawShop')).toBeInTheDocument();
  });
  it('renders user icon when authenticated', () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId('user-icon')).toBeInTheDocument();
  });
});

describe('Header component behaviour', () => {
  it('should open drawer menu', async () => {
    window.innerWidth = 400;
    fireEvent(window, new Event('resize'));
    const { getByTestId, getByText } = render(<Header />);
    const burgerMenu = getByTestId('hamburger-menu');
    await userEvent.click(burgerMenu).then(() => expect(getByText('Available pages')).toBeInTheDocument());
  });
  it('should open cart popover', async () => {
    window.innerWidth = 400;
    fireEvent(window, new Event('resize'));
    const { getByTestId } = render(<Header />);
    const cartPopoverContent = getByTestId('cart-popover-button');
    await userEvent.click(cartPopoverContent).then(() => expect(getByTestId('cart-popover')).toBeInTheDocument());
  });
});