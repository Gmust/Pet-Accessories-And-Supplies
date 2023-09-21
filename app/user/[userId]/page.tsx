import { AccountInfo } from '@/src/components/UserPage/AccountInfo';
import { OrdersList } from '@/src/components/UserPage/OrdersList/OrdersList';
import { authService } from '@/src/services/authService';
import { ordersService } from '@/src/services/ordersService';
import { authOptions } from '@/src/utils/lib/auth';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import styles from './userPage.module.css';


const UserPage = async ({ params }: { params: { slug: string } }) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();
  const user = await authService.getUser(session?.user.jwt!);
  if (!user) notFound();
  const ordersResponse = await ordersService.getOrders(session.user.jwt!);

  return (
    <div className={styles.userPageWrapper}>
      <div className={styles.accountInfo}>
        <AccountInfo username={user.username} email={user.email} />
      </div>
      <div className={styles.ordersList}>
        {
          ordersResponse?.data.length! > 0 ?
            <OrdersList data={ordersResponse?.data!} meta={ordersResponse?.meta!} />
            :
            <div>no orders</div>
        }
      </div>
    </div>
  );
};

export default UserPage;