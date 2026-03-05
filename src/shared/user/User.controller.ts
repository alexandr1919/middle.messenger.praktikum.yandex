import Router from '../router/Router';
import { PATHS } from '../router/Router.utils';

import { UserApi } from './User.api';
import { UpdatePasswordPayload, UpdateProfilePayload, UserModel } from './User.types';

const userApi = new UserApi();

export class UserController {
  async getUser(): Promise<UserModel> {
    const res = await userApi.getUser();
    return res.data as UserModel;
  }

  async updateUser(data: UpdateProfilePayload): Promise<void> {
    const res = await userApi.updateProfile(data);
    localStorage.setItem('user', JSON.stringify(res.data));
  }

  async updateAvatar(data: FormData): Promise<void> {
    const res = await userApi.updateAvatar(data);
    localStorage.setItem('user', JSON.stringify(res.data));
  }

  async updatePassword(data: UpdatePasswordPayload): Promise<void> {
    await userApi.updatePassword(data);
  }

  async logout(): Promise<void> {
    await userApi.logout();
    localStorage.clear();
    Router.getInstance().go(PATHS.LOGIN);
  }

  async searchUsers(login: string): Promise<UserModel[]> {
    const res = await userApi.search(login);
    return res.data as UserModel[];
  }
}
