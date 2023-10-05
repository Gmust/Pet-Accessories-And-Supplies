import { CartContext, CartContextParams } from '@/context';
import { OrderForm } from '@/src/components/OrderPage/OrderForm';
import { User } from '@/types';
import { render } from '@testing-library/react';


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
    redirect: jest.fn(),
  };
});

const mockedSession = {
  expires: new Date(Date.now() + 2 * 86400).toISOString(),
  jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY5NjUxNTU3OSwiZXhwIjoxNjk3MTIwMzc5fQ.4GfHdUw40QKZYn8hY0MvyFWCKPZtK91vs6qK3-HSjv0',
  user: {
    username: 'Steve',
    jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY5NjUxNTU3OSwiZXhwIjoxNjk3MTIwMzc5fQ.4GfHdUw40QKZYn8hY0MvyFWCKPZtK91vs6qK3-HSjv0',
    confirmed: false,
    email: 'test@gmail.com',
    id: 1,
    blocked: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    orders: undefined,
    reviews: {
      data: [],
    },
    cart: undefined,
  } as User,
};

const mockedOrder = {
  setCart: jest.fn(),
  setOrder: jest.fn(),
  order: {
    attributes: {
      products: { data: [] },
      confirmed: false,
      totalPrice: 1231231,
      country: 'Poland',
      city: 'Poznan',
      address: 'rwr32 34 1',
      amount: 2,
    },
  },
  cart: {
    data: {
      id: 1,
      attributes: {
        uuid: 'fdfsfd',
        products: {
          data: [
            {
              id: 1,
              attributes: {
                uuid: 'dsfdsf',
                name: 'fdsfds',
                reviews: { data: [] },
                stripeId: 'sdasd',
                product_type: {
                  data: {
                    id: 1,
                    attributes: {
                      name: 'sdasad',
                      UUID: 'dasddas',
                    },
                  },
                },
                price: 13212,
                brand: {
                  data: {
                    id: 1,
                    attributes: {
                      UUID: 'fdsfd',
                      name: 'dsadsa',
                    },
                  },
                },
                coverPicture: {
                  data: {
                    id: 1,
                    attributes: {
                      url: '/dadsdasd',
                    },
                  },
                },
                additionalInfo: null,
                additionalImages: null,
                description: 'dasdsa',
              },
            },
          ],
        },
      },
    }, meta: null,
  },
};

describe('Order form page  - rendering', () => {
  it('Should have inputs for country, city, address', () => {
    const { getByPlaceholderText } = render(
      <CartContext.Provider
        // @ts-ignore
        value={mockedOrder}>
        <OrderForm
          // @ts-ignore
          session={{ expires: mockedSession.expires, jwt: mockedSession.jwt, user: mockedSession.user }} />
      </CartContext.Provider>,
    );
    expect(getByPlaceholderText('Enter your country')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter your city')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter your address')).toBeInTheDocument();
  });
});