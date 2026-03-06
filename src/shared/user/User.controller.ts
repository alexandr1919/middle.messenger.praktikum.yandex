import { Router, PATHS } from '../router';
import Store from '../store/Store';

import { UserApi } from './User.api';
import { UpdatePasswordPayload, UpdateProfilePayload, UserModel } from './User.types';

const userApi = new UserApi();

export class UserController {
  async fetchUser(): Promise<void> {
    const res = await userApi.getUser();
    Store.set('user', res.data);
  }

  async getUser(): Promise<UserModel> {
    const res = await userApi.getUser();
    return res.data as UserModel;
  }

  async updateUser(data: UpdateProfilePayload): Promise<void> {
    const res = await userApi.updateProfile(data);
    Store.set('user', res.data);
  }

  async updateAvatar(data: FormData): Promise<void> {
    const res = await userApi.updateAvatar(data);
    Store.set('user', res.data);
  }

  async updatePassword(data: UpdatePasswordPayload): Promise<void> {
    await userApi.updatePassword(data);
  }

  async logout(): Promise<void> {
    await userApi.logout();
    Store.set('user', null);
    Router.getInstance().go(PATHS.LOGIN);
  }

  async searchUsers(login: string): Promise<UserModel[]> {
    const res = await userApi.search(login);
    return res.data as UserModel[];
  }
}
