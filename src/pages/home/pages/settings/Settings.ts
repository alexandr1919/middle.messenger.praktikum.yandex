import { Button } from '../../../../shared/ui/components/button/Button';
import { TextInput } from '../../../../shared/ui/components/text-input';
import { loginValidators, nameValidators, phoneValidators } from '../../../../shared/utils/validators';
import { BaseForm } from '../../../auth/base-form';

import { SettingsFormTemplate } from './Settings.tmpl';
import './settings.css';

export class Settings extends BaseForm {
  formValues: string[] = ['login', 'first_name', 'second_name', 'display_name', 'phone'];

  constructor() {
    super({
      class: 'settings__form',
      children: {
        login: new TextInput({
          name: 'login',
          placeholder: 'Login',
          validators: loginValidators,
          value: 'user_login'
        }),
        firstName: new TextInput({
          name: 'first_name',
          placeholder: 'First name',
          validators: nameValidators,
          value: 'First name'
        }),
        secondName: new TextInput({
          name: 'second_name',
          placeholder: 'Second name',
          validators: nameValidators,
          value: 'Second name'
        }),
        displayName: new TextInput({
          name: 'display_name',
          placeholder: 'Display name',
          value: 'displayName'
        }),
        phone: new TextInput({
          name: 'phone',
          placeholder: 'Phone',
          type: 'tel',
          validators: phoneValidators,
          value: '+12345678910'
        }),
        button: new Button({ text: 'Save', type: 'submit' })
      }
    });
  }

  render() {
    return this.compile(SettingsFormTemplate);
  }
}
