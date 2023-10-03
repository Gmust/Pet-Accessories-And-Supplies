import styles from '@/app/shop/shopPage.module.css';
import { FiltersBar } from '@/src/components/ShopPage/FiltersBar/FiltersBar';
import { SearchBar } from '@/src/components/ShopPage/SearchBar/SearchBar';
import { goodsService } from '@/src/services/goodsService';

const ShopLayout = async ({ children }: {
  children: React.ReactNode
}) => {
  const brands = await goodsService.getBrands();
  const productTypes = await goodsService.getProductTypes();
  return (
    <section className={styles.container}>
      <div className={styles.searchArea}>
        <SearchBar brands={brands!} productTypes={productTypes!} />
      </div>
      <div className={styles.filters}>
        <FiltersBar brands={brands!} productTypes={productTypes!} />
      </div>
      <div className={styles.goods}>
        {children}
      </div>
    </section>
  );
};


export default ShopLayout;