import { AuthApi } from '../api';

type SignUpResponse = { id: number };

export default class RegistrationApi extends AuthApi<SignUpResponse> {
  apiPath = '/auth/signup';
}
