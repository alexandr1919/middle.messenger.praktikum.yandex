import { BaseLink } from '../../../shared/ui/components/base-link';
import { Button } from '../../../shared/ui/components/button/Button';
import { TextInput } from '../../../shared/ui/components/text-input';
import { loginValidators, passwordValidators } from '../../../shared/utils/validators';
import { PATHS } from '../../../shared/router/paths';

export const createLoginFormChildren = () => ({
  title: 'Login',
  login: new TextInput({
    name: 'login',
    placeholder: 'Login',
    validators: loginValidators
  }),
  password: new TextInput({
    name: 'password',
    placeholder: 'Password',
    validators: passwordValidators,
    type: 'password'
  }),
  button: new Button({ text: 'Login', type: 'submit' }),
  redirectLink: new BaseLink({ text: 'Sign up', href: PATHS.REGISTRATION })
});
