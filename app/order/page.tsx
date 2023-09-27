import { OrderForm } from '@/src/components/OrderPage/OrderForm';
import { authOptions } from '@/src/utils/lib/auth';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import styles from './orderPage.module.css';

const OrderPage =async () => {

  const session = await getServerSession(authOptions);
  if (!session) notFound();

  return (
    <div className={styles.orderPageWrapper}>
      <OrderForm session={session} />
    </div>
  );
};

export default OrderPage;