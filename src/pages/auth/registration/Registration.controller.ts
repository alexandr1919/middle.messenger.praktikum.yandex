import { Router, PATHS } from '../../../shared/router';
import { UserController } from '../../../shared/user';

import RegistrationApi from './Registration.api';
import { RegistrationFormModel } from './Registration.types';

const registrationApi = new RegistrationApi();
const userController = new UserController();

export class RegistrationController {
  public async signUp(data: Partial<RegistrationFormModel>) {
    await registrationApi.create(data);
    await userController.fetchUser();
    Router.getInstance().go(PATHS.CHATS);
  }
}
