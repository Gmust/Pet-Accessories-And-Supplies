import { ordersService } from '@/src/services/ordersService';
import { authOptions } from '@/src/utils/lib/auth';
import { getServerSession } from 'next-auth';
import styles from './cancelOrderPage.module.css';

const ConfirmedOrderPage = async ({ params, searchParams }: { params: any, searchParams: any }) => {
  const session = await getServerSession(authOptions);
  const res = await ordersService.cancelOrder(session?.user.jwt!, searchParams.orderId);
  if (res) {
    console.log('redirect');
    setTimeout(() => window.location.replace('/shop'), 3000);
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.fontStyle}>
        Your order has been canceled
      </div>
      <div className={styles.fontStyle}>
        Redirecting....
      </div>
    </div>
  );
};

export default ConfirmedOrderPage;