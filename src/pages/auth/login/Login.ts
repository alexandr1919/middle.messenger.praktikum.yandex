import { connect } from '../../../shared/connector/connector';
import { StoreState } from '../../../shared/store/Store.types';
import { BaseForm } from '../base-form/BaseForm';

import { LoginFormTemplate } from './Login.tmpl';
import { LoginFormModel } from './Login.types';
import { LoginController } from './Login.controller';
import { createLoginFormChildren } from './Login.utils';

class LoginBase extends BaseForm<LoginFormModel> {
  formValues: string[] = ['login', 'password'];
  constructor() {
    super({ children: createLoginFormChildren() });
  }

  render() {
    return this.compile(LoginFormTemplate, { error: this.error });
  }

  async handleSubmit(data: Partial<LoginFormModel>) {
    await new LoginController().login(data);
  }

  async onSubmit() {
    await super.onSubmit();
  }
}

const mapLoginStateToProps = (state: StoreState) => ({ isLoading: state.isLoading });

export default connect(mapLoginStateToProps)(LoginBase);
