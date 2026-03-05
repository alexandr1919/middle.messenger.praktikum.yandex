import { Button } from '../../../../../../shared/ui/components/button/Button';
import { TextInput } from '../../../../../../shared/ui/components/text-input';
import { passwordValidators } from '../../../../../../shared/utils/validators';

export const getChangePasswordFormChildren = () => ({
  oldPassword: new TextInput({
    name: 'oldPassword',
    placeholder: 'Current password',
    type: 'password',
    validators: passwordValidators
  }),
  newPassword: new TextInput({
    name: 'newPassword',
    placeholder: 'New password',
    type: 'password',
    validators: passwordValidators
  }),
  button: new Button({ text: 'Change password', type: 'submit' })
});
