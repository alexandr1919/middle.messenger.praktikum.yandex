import { connect } from '../../../../../../shared/connector/connector';
import Store from '../../../../../../shared/store/Store';
import { StoreState } from '../../../../../../shared/store/Store.types';
import { BaseForm } from '../../../../../auth/base-form';
import { ChatsApi } from '../../chats-layout/Chats.api';
import { ChatsController } from '../../chats-layout/Chats.controller';

import { AddChatTemplate } from './AddChat.tmpl';
import { AddChatFormModel } from './AddChat.types';
import { getAddChatFormChildren } from './AddChat.utils';

import './add-chat.css';

const chatsApi = new ChatsApi();
const chatsController = ChatsController.getInstance();

class AddChatBase extends BaseForm<AddChatFormModel> {
  formValues: string[] = ['title'];

  constructor() {
    super({
      class: 'add-chat__form',
      children: getAddChatFormChildren()
    });
  }

  async handleSubmit(data: Partial<AddChatFormModel>): Promise<void> {
    await chatsApi.create(data as Record<string, unknown>);
    await chatsController.getChats();
    Store.set('modal', null);
  }

  render() {
    return this.compile(AddChatTemplate, { error: this.error, successMessage: this.successMessage });
  }
}

const mapStateToProps = (state: StoreState) => ({ isLoading: state.isLoading });

export const AddChat = connect(mapStateToProps)(AddChatBase);
