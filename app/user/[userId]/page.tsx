import { AccountInfo } from '@/src/components/UserPage/AccountInfo';
import { UserPageContent } from '@/src/components/UserPage/UserPageContent';
import { authService } from '@/src/services/authService';
import { ordersService } from '@/src/services/ordersService';
import { reviewsService } from '@/src/services/reviewsService';
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
  const userReviewsResponse = await reviewsService.getAllUserReviews(session.user.jwt!, session.user.id);

  return (
    <div className={styles.userPageWrapper}>
      <div className={styles.accountInfo}>
        <AccountInfo username={user.username} email={user.email} />
      </div>
      <div className={styles.content}>
          <UserPageContent ordersResponse={ordersResponse!} userReviews={userReviewsResponse} />
      </div>
    </div>
  );
};

export default UserPage;