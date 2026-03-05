import Router from '../../../shared/router/Router';
import { PATHS } from '../../../shared/router/Router.utils';
import { UserController } from '../../../shared/user';

import { LoginApi } from './Login.api';
import { LoginFormModel } from './Login.types';

const loginApi = new LoginApi();
const userController = new UserController();

export class LoginController {
  public async login(data: Partial<LoginFormModel>) {
    await loginApi.create(data);
    const user = await userController.getUser();
    localStorage.setItem('user', JSON.stringify(user));
    Router.getInstance().go(PATHS.CHATS);
  }
}
