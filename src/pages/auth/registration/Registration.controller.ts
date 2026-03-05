import Router from '../../../shared/router/Router';
import { PATHS } from '../../../shared/router/Router.utils';
import { UserController } from '../../../shared/user';

import RegistrationApi from './Registration.api';
import { RegistrationFormModel } from './Registration.types';

const registrationApi = new RegistrationApi();
const userController = new UserController();

export class RegistrationController {
  public async signUp(data: Partial<RegistrationFormModel>) {
    await registrationApi.create(data);
    const user = await userController.getUser();
    localStorage.setItem('user', JSON.stringify(user));
    Router.getInstance().go(PATHS.CHATS);
  }
}
