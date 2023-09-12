import { queryStringGenerator } from '@/src/utils/queryStringGenerator';

interface SearchParams {
  searchParams: {
    brands?: string
    product_types?: string
    price?: number
  };
}


const getGoodsByFilter = async ({ searchParams }: SearchParams) => {
  try {
  } catch (e) {
    console.log(e);
  }
};

const SearchPage = ({ searchParams }: SearchParams) => {


  return (
    <div>
      {searchParams.product_types}
      {searchParams.brands}
      {searchParams.price}
    </div>
  );
};

export default SearchPage;