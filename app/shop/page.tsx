import { FiltersBar } from '@/src/components/ShopPage/FiltersBar/FiltersBar';
import { ProductCards } from '@/src/components/ShopPage/ProductCards/ProductCards';
import { ProductsAlert } from '@/src/components/ShopPage/ProductsAlert/ProductsAlert';
import { SearchBar } from '@/src/components/ShopPage/SearchBar/SearchBar';
import { goodsService } from '@/src/services/goodsService';
import styles from './shopPage.module.css';

const ShopPage = async () => {

  const goods = await goodsService.getProducts();

  return (
    <>
      {
        goods ?
          <ProductCards data={goods.data} />
          : <ProductsAlert />
      }
    </>
  );

};

export default ShopPage;