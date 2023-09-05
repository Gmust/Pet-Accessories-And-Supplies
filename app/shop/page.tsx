import { ProductCards } from '@/src/components/ShopPage/ProductCards/ProductCards';
import { ProductsAlert } from '@/src/components/ShopPage/ProductsAlert/ProductsAlert';
import { SearchBar } from '@/src/components/ShopPage/SearchBar/SearchBar';
import { goodsService } from '@/src/services/goodsService';
import styles from './shopPage.module.css';

const ShopPage = async () => {

  const goods = await goodsService.getProducts();


  return (
    <div className={styles.container}>

      <div className={styles.searchArea}>
        <SearchBar />
      </div>
      <div className={styles.filters}>

      </div>
      <div className={styles.goods}>
        {
          goods ?
            <ProductCards data={goods.data} />
            : <ProductsAlert />
        }
      </div>

    </div>
  );

};

export default ShopPage;