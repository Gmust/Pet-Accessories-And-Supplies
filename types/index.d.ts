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
    pagination: {
      page: number,
      pageSize: number,
      pageCount: number,
      total: number
    }
  } | null;
}