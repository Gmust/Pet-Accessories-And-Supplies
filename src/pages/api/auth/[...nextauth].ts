import { authOptions } from '@/src/utils/lib/auth';
import NextAuth from 'next-auth';


export default NextAuth(authOptions)