interface GoodsResponse {
  data: Product[];
  meta?: {
    pagination: {
      page: number,
      pageSize: number,
      pageCount: number,
      total: number
    }
  };
}

interface ProductResponse {
  data: Product;
  meta: {
    pagination: {
      page: number,
      pageSize: number,
      pageCount: number,
      total: number
    }
  } | null;
}

interface Product {
  id: number,
  attributes: ProductData
}

interface ProductData {
  brand: {
    data: BrandData
  }
  name: string
  description: string,
  uuid: string,
  product_type: {
    data: ProductTypes
  },
  additionalInfo: {
    basicIngredients: string[],
    weight: string
  }
  coverPicture: {
    data: {
      id: number,
      attributes: Image
    }
  },
  additionalImages: {
    data: AdditionalImages[]
  },
  reviews: Reviews,
  price: number,
  stripeId: string
}

interface Image {
  name: string,
  alternativeText?: string,
  caption?: string,
  url: string
  createdAt: Date | string
}

interface AdditionalImages {
  id: number,
  attributes: Image
}

interface Review {
  id: number,
  attributes: {
    text: string,
    rating: number,
    createdAt: string,
    user: {
      data: {
        id: number,
        attributes: User
      }
    },
    product: {
      data: Product
    }
  }
}

interface UserReviews {
  data: Review[];
}

interface ReviewResponse {
  data: Review,
  meta: {}
}

interface Reviews {
  data: Review[];
}

interface BrandData {
  id: number,
  attributes: {
    UUID: string,
    name: string
  }
}

interface ProductTypes {
  id: number,
  attributes: {
    name: string,
    UUID: string
  }
}

interface BrandsResponse {
  data: BrandData[];
  meta: {
    pagination: {
      page: number,
      pageSize: number,
      pageCount: number,
      total: number
    }
  } | null;
}

interface ProductTypesResponse {
  data: ProductTypes[];
  meta: {
    pagination: Pagination
  } | null;
}

interface Cart {
  id: number,
  createdAt: Date,
  updatedAt: Date,
  products: Product[]
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}


interface Order {
  address: string,
  city: string,
  country: string,
  amount: number
  confirmed: boolean,
  products: GoodsResponse
  totalPrice: number
}

interface OrdersResponse {
  data: OrderData[];
  meta: {
    pagination: Pagination
  };
}

interface OrderData {
  id: number,
  attributes: Order
}

interface CartResponse {
  data: {
    id: number,
    attributes: {
      uuid: string,
      products: {
        data: Product[]
      }
    }
  };
  meta: {
    pagination: Pagination
  };
}


interface Cart {
  id: number,
  uuid: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  products: {
    data: ProductData[]
  }
}

interface CreatedOrderResponse {
  data: OrderData,
  meta: {}
}


interface RegisterUser {
  email: string,
  username: string,
  password: string
}

interface LoginUser {
  identifier: string,
  password: string
}

interface AuthResponse {
  jwt: string,
  user: User
}

interface User {
  blocked: boolean,
  confirmed: boolean,
  createdAt: Date,
  id: number,
  username: string
  email: string
  updatedAt: Date,
  reviews: Reviews,
  cart?: Cart,
  jwt?: string
  orders?: Order[]
}

