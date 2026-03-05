import { connect } from '../../../shared/connector/connector';
import { StoreState } from '../../../shared/store/Store.types';
import { BaseForm } from '../base-form/BaseForm';

import { RegistrationFormTemplate } from './Registration.tmpl';
import { RegistrationFormModel } from './Registration.types';
import { RegistrationController } from './Registration.controller';
import { createRegistrationFormChildren } from './Registration.utils';

class RegistrationBase extends BaseForm<RegistrationFormModel> {
  formValues: string[] = ['first_name', 'second_name', 'login', 'email', 'password', 'phone'];
  constructor() {
    super({ children: createRegistrationFormChildren() });
  }

  render() {
    return this.compile(RegistrationFormTemplate, { error: this.error });
  }

  async handleSubmit(data: Partial<RegistrationFormModel>) {
    await new RegistrationController().signUp(data);
  }

  async onSubmit() {
    await super.onSubmit();
  }
}

const mapRegistrationStateToProps = (state: StoreState) => ({ isLoading: state.isLoading });

export default connect(mapRegistrationStateToProps)(RegistrationBase);
