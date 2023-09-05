import { ProductType } from '@/types/enums';

interface GoodsResponse {
  data: Product[];
  meta: {
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
  brand: string,
  name: string
  description: string,
  uuid: string,
  productType: ProductType,
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
  price: number
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
    createdAt: string
  }
}

interface Reviews {
  data: Review[];
}