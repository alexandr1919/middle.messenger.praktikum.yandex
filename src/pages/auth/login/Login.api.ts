import { AuthApi } from '../api';

export class LoginApi extends AuthApi<void> {
  apiPath = '/auth/signin';
}
