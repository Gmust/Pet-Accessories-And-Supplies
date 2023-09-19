import { cartService } from '@/src/services/cartService';
import { $unAuthHost } from '@/src/services/index';

export const authService = {
  async registerUser({ password, username, email }: RegisterUser) {
    const {data} = await $unAuthHost.post<User>('users', {
      username, password, email, role: 1,
    })
    return data;
  },
  async loginUser({ password, identifier }: LoginUser) {
    return await $unAuthHost.post('auth/local', {
      identifier,
      password,
    });
  },
};
