import { ordersService } from '@/src/services/ordersService';
import { authOptions } from '@/src/utils/lib/auth';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import styles from './cancelOrderPage.module.css';

const ConfirmedOrderPage = async ({ params, searchParams }: { params: any, searchParams: any }) => {
  const session = await getServerSession(authOptions);
  const res = await ordersService.cancelOrder(session?.user.jwt!, searchParams.orderId);
  if (res) {
    redirect('/shop');
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.fontStyle}>
        Your order has been canceled
      </div>
      <div className={styles.fontStyle}>
        Redirecting....
      </div>
      <div className={styles.fontStyle}>
        If you were not redirected, <Link href='/shop'> click here</Link>
      </div>
    </div>
  );
};

export default ConfirmedOrderPage;