import { connect } from '../../../../../../shared/connector/connector';
import { StoreState } from '../../../../../../shared/store/Store.types';
import { UpdateProfilePayload, UserController, UserModel } from '../../../../../../shared/user';
import { BaseForm } from '../../../../../auth/base-form';

import { UserSettingsTemplate } from './UserSettings.tmpl';
import { getUserSettingsFormChildren } from './UserSettings.utils';

type UserSettingsFormModel = {
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
};

class UserSettingsBase extends BaseForm<UserSettingsFormModel> {
  formValues: string[] = ['login', 'first_name', 'second_name', 'display_name', 'phone'];

  constructor() {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? (JSON.parse(storedUser) as UserModel) : undefined;
    super({
      class: 'settings__form',
      children: getUserSettingsFormChildren(user)
    });
  }

  async handleSubmit(_data: Partial<UserSettingsFormModel>): Promise<void> {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? (JSON.parse(storedUser) as UserModel) : null;
    await new UserController().updateUser({ ..._data, email: user?.email ?? '' } as UpdateProfilePayload);
    this.updateSuccess('Profile saved!');
  }

  render() {
    return this.compile(UserSettingsTemplate, { error: this.error, successMessage: this.successMessage });
  }
}

const mapStateToProps = (state: StoreState) => ({ isLoading: state.isLoading });

export const UserSettings = connect(mapStateToProps)(UserSettingsBase);
