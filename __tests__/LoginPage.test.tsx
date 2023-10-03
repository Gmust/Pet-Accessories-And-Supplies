import { Login } from '@/src/components/LoginPage/Login';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';


Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: any) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

describe('Login page - rendering', () => {
  it('should have inputs for identifier and password', () => {
    render(
      <Login />,
    );
    expect(screen.getByTestId('identifier')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Email or Username')).toBeInTheDocument();
  });
});

describe('Login page behaviour', () => {
  it('Should display password', async () => {
    render(
      <Login />,
    );
    expect(screen.getByLabelText('Password').getAttribute('type')).toBe('password');
    const showPassword = screen.getByTestId('show-password');
    await userEvent.click(showPassword).then(() => expect(screen.getByTestId('password').getAttribute('type')).toBe('text'));
  });
  it('should navigate to register page', () => {
    render(
      <Login />,
    );
    const links: HTMLAnchorElement[] = screen.getAllByRole('link');
    expect(links[0].textContent).toEqual('Sign in');
    expect(links[0].href).toContain('/registration');
  });
});

describe('Login', () => {
  describe('with valid inputs', () => {
    it('calls onSubmit function', async () => {
      const mockOnSubmit = jest.fn();
      const { getByLabelText, getByRole, getByTestId } = render(<Login onSubmitTest={mockOnSubmit} />);
      await act(async () => {
        fireEvent.change(getByLabelText('Email or Username'), { target: { value: 'email@gmail.com' } });
        fireEvent.change(getByLabelText('Password'), { target: { value: 'Password1@' } });
      });
      await act(async () => {
        fireEvent.click(getByTestId('submit-form'));
      });
      expect(mockOnSubmit).toBeCalled();
    });
  });
  describe('with invalid identifier', () => {
    it('renders the identifier validation error', async () => {
      const { getByLabelText, container } = render(<Login />);

      await act(async () => {
        const identifierInput = getByLabelText('Email or Username');
        fireEvent.change(identifierInput, { target: { value: 'ema' } });
        fireEvent.blur(identifierInput);
      });

      expect(container.innerHTML).toMatch('Minimum length should be 4');
    });
  });
  describe('with invalid password', () => {
    it('renders the password validation error', async () => {
      const { getByLabelText, container } = render(<Login />);

      await act(async () => {
        const identifierInput = getByLabelText('Password');
        fireEvent.change(identifierInput, { target: { value: '' } });
        fireEvent.blur(identifierInput);
      });
      expect(container.innerHTML).toMatch('Password is required');
    });
  });
});