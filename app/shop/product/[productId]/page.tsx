import { ProductInfo } from '@/src/components/ProductPage/ProductInfo/ProductInfo';
import { goodsService } from '@/src/services/goodsService';
import Image from 'next/image';
import styles from './productPage.module.css';

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const product = await goodsService.getProduct(params.productId);

  return (
    <div className={styles.productPageWrapper}>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <div className={styles.imageWrapper}>
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${product!.data.attributes.coverPicture.data.attributes.url}`}
              alt={'Product image'} fill />
          </div>
        </div>
        <div className={styles.rightSide}>
          <ProductInfo {...product!.data.attributes} />
        </div>
      </div>
    </div>
  );
};


export default ProductPage;