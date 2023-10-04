import { ProductCards } from '@/src/components/ShopPage/ProductCards/ProductCards';
import { ProductsAlert } from '@/src/components/ShopPage/ProductsAlert/ProductsAlert';
import { goodsService } from '@/src/services/goodsService';

const ShopPage = async () => {

  const goods = await goodsService.getProducts();

  return (
    <>
      {
        goods ?
          <ProductCards data={goods.data} />
          : <ProductsAlert data-testid='products-alert' />
      }
    </>
  );

};

export default ShopPage;