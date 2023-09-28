import { AddToCart } from '@/src/components/ProductPage/AddToCart/AddToCart';
import { ProductImagesSwiper } from '@/src/components/ProductPage/ProductImagesSwiper/ProductImagesSwiper';
import { ProductInfo } from '@/src/components/ProductPage/ProductInfo/ProductInfo';
import { goodsService } from '@/src/services/goodsService';
import { authOptions } from '@/src/utils/lib/auth';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import styles from './productPage.module.css';

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await goodsService.getProduct(params.productId);
  if (!product) notFound();
  const session = await getServerSession(authOptions);

  return (
    <div className={styles.test}>
      <div className={styles.productPageWrapper}>
        <div className={styles.container}>
            <div className={styles.leftSide}>
              <ProductImagesSwiper additionalImages={product.data.attributes.additionalImages} />
            </div>
            <div className={styles.rightSide}>
              <ProductInfo {...product!.data.attributes} />
            </div>
            <div className={styles.addToCart}>
              {session && <AddToCart id={product.data.id} attributes={product.data.attributes} />}
            </div>
        </div>
      </div>
    </div>
  );
};


export default ProductPage;