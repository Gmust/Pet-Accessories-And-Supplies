import { $authHost, $unAuthHost } from '@/src/services/index';

export const authService = {
  async registerUser({ password, username, email }: RegisterUser) {
    const { data } = await $unAuthHost.post<User>('users', {
      username, password, email, role: 1,
    });
    return data;
  },
  async loginUser({ password, identifier }: LoginUser) {
    const { data } = await $unAuthHost.post<AuthResponse>('auth/local', {
      identifier,
      password,
    });
    return data;
  },
  async getUser(jwt: string) {
    const { data } = await $authHost.get<User>('users/me?populate=deep', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return data;
  },
};
