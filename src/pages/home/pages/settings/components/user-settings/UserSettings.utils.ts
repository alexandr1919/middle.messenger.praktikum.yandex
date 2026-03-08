import { Button } from '../../../../../../shared/ui/components/button/Button';
import { TextInput } from '../../../../../../shared/ui/components/text-input';
import { loginValidators, nameValidators, phoneValidators } from '../../../../../../shared/utils/validators';
import { UserModel } from '../../../../../../shared/user';

export const getUserSettingsFormChildren = (user?: UserModel) => ({
  login: new TextInput({
    name: 'login',
    placeholder: 'Login',
    validators: loginValidators,
    value: user?.login
  }),
  firstName: new TextInput({
    name: 'first_name',
    placeholder: 'First name',
    validators: nameValidators,
    value: user?.first_name
  }),
  secondName: new TextInput({
    name: 'second_name',
    placeholder: 'Second name',
    validators: nameValidators,
    value: user?.second_name
  }),
  displayName: new TextInput({
    name: 'display_name',
    placeholder: 'Display name',
    value: user?.display_name ?? ''
  }),
  phone: new TextInput({
    name: 'phone',
    placeholder: 'Phone',
    type: 'tel',
    validators: phoneValidators,
    value: user?.phone
  }),
  button: new Button({ text: 'Save', type: 'submit' })
});
