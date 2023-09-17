import { ProductCards } from '@/src/components/ShopPage/ProductCards/ProductCards';
import { ProductsAlert } from '@/src/components/ShopPage/ProductsAlert/ProductsAlert';
import { goodsService } from '@/src/services/goodsService';
import { generatePriceQueryString, queryStringGenerator } from '@/src/utils/queryStringGenerator';


interface SearchParams {
  searchParams: {
    brands: string,
    product_types: string,
    price: string
  };
}

const getGoodsByFilter = async ({ searchParams }: SearchParams) => {
  const { brands, product_types, price } = searchParams;
  const brandOpts = brands ? brands.split('.') : [];
  const product_typesOpts = product_types ? product_types.split('.') : [];
  const priceArr = price.split('.');
  const minValQuery = generatePriceQueryString({ minPrice: priceArr[0] });
  const maxValQuery = generatePriceQueryString({ maxPrice: priceArr[1] });
  let query: string = '';
  if (brandOpts.length > 0 && product_typesOpts.length <= 0) {
    query = (queryStringGenerator({
      queryValues: brandOpts,
      customName: 'brand',
      type: 'firstArg',
    }));
  }
  if (brandOpts.length <= 0 && product_typesOpts.length > 0) {
    query = (queryStringGenerator({
      queryValues: product_typesOpts,
      customName: 'product_type',
      type: 'firstArg',
    }));

  }
  if (brandOpts.length > 0 && product_typesOpts.length > 0) {
    const firstPart = queryStringGenerator({
      queryValues: brandOpts,
      customName: 'brand',
      type: 'firstArg',
    });
    const secondPart = await queryStringGenerator({
      queryValues: product_typesOpts,
      customName: 'product_type',
      type: 'secondArg',
    });
    query = `${firstPart}&${secondPart}`;
  }
  if (!query) query = '';
  try {
    console.log(query);
    const res = await goodsService.getProductsByFilters(`${query}&${minValQuery}&${maxValQuery}`);
    return res;
  } catch (e) {
    console.log(e);
  }
};

const SearchPage = async ({ searchParams }: any) => {
  const goods = await getGoodsByFilter({ searchParams });
  return (
    <>
      {
        goods?.data.length! > 0 ?
          <ProductCards data={goods!.data} />
          : <ProductsAlert />
      }
    </>
  );
};

export default SearchPage;