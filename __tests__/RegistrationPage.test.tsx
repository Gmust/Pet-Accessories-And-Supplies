import { Registration } from '@/src/components/RegistrationPage/Registration';
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

describe('Register  page - rendering', () => {
  it('should have inputs for email, username and password', () => {
    render(
      <Registration />,
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });
});

describe('Register page behaviour', () => {
  it('Should display password', async () => {
    render(
      <Registration />,
    );
    expect(screen.getByLabelText('Password').getAttribute('type')).toBe('password');
    const showPassword = screen.getByTestId('show-password');
    await userEvent.click(showPassword).then(() => expect(screen.getByTestId('password').getAttribute('type')).toBe('text'));
  });
  it('should navigate to register page', () => {
    render(
      <Registration />,
    );
    const links: HTMLAnchorElement[] = screen.getAllByRole('link');
    expect(links[0].textContent).toEqual('Sign in');
    expect(links[0].href).toContain('/login');
  });
});

describe('Register', () => {
  describe('with valid inputs', () => {
    it('calls onSubmit function', async () => {
      const mockOnSubmit = jest.fn();
      const { getByLabelText, getByRole, getByTestId } = render(<Registration onSubmitTest={mockOnSubmit} />);
      await act(async () => {
        fireEvent.change(getByLabelText('Email'), { target: { value: 'email@gmail.com' } });
        fireEvent.change(getByLabelText('Username'), { target: { value: 'CoolUser' } });
        fireEvent.change(getByLabelText('Password'), { target: { value: 'Password1@' } });
      });
      await act(async () => {
        fireEvent.click(getByTestId('submit-form'));
      });
      expect(mockOnSubmit).toBeCalled();
    });
  });
  describe('with invalid email', () => {
    it('renders the identifier validation error', async () => {
      const { getByLabelText, container } = render(<Registration />);

      await act(async () => {
        const emailInput = getByLabelText('Email');
        fireEvent.change(emailInput, { target: { value: '21qf123' } });
        fireEvent.blur(emailInput);
      });

      expect(container.innerHTML).toMatch('Invalid email');
    });
  });
  describe('with invalid username', () => {
    it('renders the username validation error', async () => {
      const { getByLabelText, container } = render(<Registration />);

      await act(async () => {
        const usernameInput = getByLabelText('Username');
        fireEvent.change(usernameInput, { target: { value: '12' } });
        fireEvent.blur(usernameInput);
      });
      expect(container.innerHTML).toMatch('Minimum length should be 4');
    });
  });
  describe('with invalid password', () => {
    it('renders the password validation error without capital letter', async () => {
      const { getByLabelText, container } = render(<Registration />);

      await act(async () => {
        const usernameInput = getByLabelText('Password');
        fireEvent.change(usernameInput, { target: { value: '1241fdf123@!$!@$!@' } });
        fireEvent.blur(usernameInput);
      });
      expect(container.innerHTML).toMatch('Should contain at least a capital letter');
    });
    it('renders the password validation error without number', async () => {
      const { getByLabelText, container } = render(<Registration />);

      await act(async () => {
        const usernameInput = getByLabelText('Password');
        fireEvent.change(usernameInput, { target: { value: 'dasdasdsadasdS' } });
        fireEvent.blur(usernameInput);
      });
      expect(container.innerHTML).toMatch('Should contain at least a number');
    });
    it('renders the password validation error without special sign', async () => {
      const { getByLabelText, container } = render(<Registration />);

      await act(async () => {
        const usernameInput = getByLabelText('Password');
        fireEvent.change(usernameInput, { target: { value: '1241fddadsadsads' } });
        fireEvent.blur(usernameInput);
      });
      expect(container.innerHTML).toMatch('Should contain at least a special character');
    });
    it('renders the password validation error without all', async () => {
      const { getByLabelText, container } = render(<Registration />);

      await act(async () => {
        const usernameInput = getByLabelText('Password');
        fireEvent.change(usernameInput, { target: { value: 'qwewqh' } });
        fireEvent.blur(usernameInput);
      });
      expect(container.innerHTML).toMatch('Should contain at least a capital letter');
      expect(container.innerHTML).toMatch('Should contain at least a number');
      expect(container.innerHTML).toMatch('Should contain at least a special character');
    });
  });
});