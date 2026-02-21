import { BaseLink } from '../../../shared/ui/components/base-link';
import { Button } from '../../../shared/ui/components/button/Button';
import { TextInput } from '../../../shared/ui/components/text-input';
import { BaseForm } from '../base-form/BaseForm';
import { loginFormValidators } from '../../../shared/utils/validators';

import { LoginFormTemplate } from './Login.tmpl';

export class Login extends BaseForm {
  formValues: string[] = ['login', 'password'];
  constructor() {
    super({
      children: {
        title: 'Login',
        login: new TextInput({ name: 'login', placeholder: 'Login', validators: loginFormValidators }),
        password: new TextInput({
          name: 'password',
          placeholder: 'Password',
          validators: loginFormValidators
        }),
        button: new Button({ text: 'Login', type: 'submit' }),
        redirectLink: new BaseLink({ text: 'Sign up', href: '/auth/registration' })
      }
    });
  }

  render() {
    return this.compile(LoginFormTemplate);
  }

  onSubmit() {
    super.onSubmit();
    window.location.href = '/home/chats';
  }
}
