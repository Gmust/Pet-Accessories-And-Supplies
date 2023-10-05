import { UserIcon } from '@/src/components/Header/UserIcon';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const push = jest.fn();

const mockUsePathname = jest.fn();
jest.mock('next/navigation', () => {
  return {
    __esModule: true,
    useRouter: () => ({
      push,
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
    const { getByText, getByTestId } = render(<UserIcon email='test@gmail.com' id={1} />);
    await userEvent.click(getByTestId('accountLink'));
    await userEvent.click(getByTestId('ordersLink'));
    expect(push).toHaveBeenCalledWith('/user/1');
    expect(push).toHaveBeenCalledWith('/user/1/orders');
  });
});