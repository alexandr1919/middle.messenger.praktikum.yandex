import { Router, PATHS } from '../../../shared/router';
import { UserController } from '../../../shared/user';

import { LoginApi } from './Login.api';
import { LoginFormModel } from './Login.types';

const loginApi = new LoginApi();
const userController = new UserController();

export class LoginController {
  public async login(data: Partial<LoginFormModel>) {
    await loginApi.create(data);
    await userController.fetchUser();
    Router.getInstance().go(PATHS.CHATS);
  }
}
