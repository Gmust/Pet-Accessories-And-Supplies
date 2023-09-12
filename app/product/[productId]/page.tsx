import { AddToCart } from '@/src/components/ProductPage/AddToCart/AddToCart';
import { ProductImagesSwiper } from '@/src/components/ProductPage/ProductImagesSwiper/ProductImagesSwiper';
import { ProductInfo } from '@/src/components/ProductPage/ProductInfo/ProductInfo';
import { goodsService } from '@/src/services/goodsService';
import { notFound } from 'next/navigation';
import styles from './productPage.module.css';

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await goodsService.getProduct(params.productId);
  if (!product) notFound();

  return (
    <div>
      <div className={styles.productPageWrapper}>
        <div className={styles.container}>
          <>
            <div className={styles.leftSide}>
              <ProductImagesSwiper additionalImages={product.data.attributes.additionalImages} />
            </div>
            <div className={styles.rightSide}>
              <ProductInfo {...product!.data.attributes} />
            </div>
            <div className={styles.addToCart}>
              <AddToCart name={product.data.attributes.name} coverPicture={product.data.attributes.coverPicture}
                         brand={product.data.attributes.brand}
                         product_type={product.data.attributes.product_type} />
            </div>
          </>
        </div>
      </div>
    </div>
  );
};


export default ProductPage;