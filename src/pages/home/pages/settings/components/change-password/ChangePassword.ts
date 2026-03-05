import { connect } from '../../../../../../shared/connector/connector';
import { StoreState } from '../../../../../../shared/store/Store.types';
import { UpdatePasswordPayload, UserController } from '../../../../../../shared/user';
import { BaseForm } from '../../../../../auth/base-form';

import { ChangePasswordTemplate } from './ChangePassword.tmpl';
import { ChangePasswordFormModel } from './ChangePassword.types';
import { getChangePasswordFormChildren } from './ChangePassword.utils';

class ChangePasswordBase extends BaseForm<ChangePasswordFormModel> {
  formValues: string[] = ['oldPassword', 'newPassword'];

  constructor() {
    super({
      class: 'settings__form settings__form--password',
      children: getChangePasswordFormChildren()
    });
  }

  async handleSubmit(_data: Partial<ChangePasswordFormModel>): Promise<void> {
    if (!_data.oldPassword || !_data.newPassword) {
      throw new Error('Both passwords are required');
    }
    await new UserController().updatePassword(_data as UpdatePasswordPayload);
    this.updateSuccess('Changed successfully');
  }

  render() {
    return this.compile(ChangePasswordTemplate, { error: this.error, successMessage: this.successMessage });
  }
}

const mapStateToProps = (state: StoreState) => ({ isLoading: state.isLoading });

export const ChangePassword = connect(mapStateToProps)(ChangePasswordBase);
