import { BaseLink } from '../../../shared/ui/components/base-link';
import { Button } from '../../../shared/ui/components/button/Button';
import { TextInput } from '../../../shared/ui/components/text-input';
import {
  emailValidators,
  loginValidators,
  nameValidators,
  passwordValidators,
  phoneValidators
} from '../../../shared/utils/validators';
import { BaseForm } from '../base-form/BaseForm';

import { RegistrationFormTemplate } from './Registration.tmpl';

export class Registration extends BaseForm {
  formValues: string[] = ['first_name', 'second_name', 'login', 'email', 'password', 'phone'];
  constructor() {
    super({
      children: {
        title: 'Registration',
        firstName: new TextInput({
          name: 'first_name',
          placeholder: 'First name',
          validators: nameValidators
        }),
        secondName: new TextInput({ name: 'second_name', placeholder: 'Second name', validators: nameValidators }),
        login: new TextInput({
          name: 'login',
          placeholder: 'Login',
          validators: loginValidators
        }),
        email: new TextInput({ name: 'email', placeholder: 'Email', validators: emailValidators, type: 'email' }),
        password: new TextInput({
          name: 'password',
          placeholder: 'Password',
          validators: passwordValidators,
          type: 'password'
        }),
        repeatPassword: new TextInput({ name: 'repeat_password', placeholder: 'Repeat password', type: 'password' }),
        phone: new TextInput({ name: 'phone', placeholder: 'Phone', validators: phoneValidators, type: 'tel' }),
        button: new Button({ text: 'Sign Up', type: 'submit' }),
        redirectLink: new BaseLink({ text: 'To Login', href: '/' })
      }
    });
  }

  render() {
    return this.compile(RegistrationFormTemplate);
  }

  onSubmit() {
    super.onSubmit();
  }
}
