'use client';

import { cartService } from '@/src/services/cartService';
import { useRouter } from 'next/navigation';
import styles from './confirmOrderPage.module.css';

const ConfirmedOrderPage = async ({ params, searchParams }: { params: any, searchParams: any }) => {


  setTimeout(() => {
    window.location.replace(`/user/${searchParams.userId}`);
  }, 2000);

  return (
    <div className={styles.wrapper}>
      <div className={styles.fontStyle}>
        Your order has been confirmed!
      </div>
      <div className={styles.fontStyle}>
        Redirecting....
      </div>
    </div>
  );
};

export default ConfirmedOrderPage;