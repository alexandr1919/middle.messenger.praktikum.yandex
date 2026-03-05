import { Block } from '../../../../../../../../shared/block';
import { ChatsController } from '../../../../chats-layout/Chats.controller';

import { MessageInputTemplate } from './MessageInput.tmpl';

const chatsController = ChatsController.getInstance();

export class MessageInput extends Block {
  constructor() {
    super('form', {
      attributes: { class: 'chat__form' },
      onSubmit(event: Event) {
        event.preventDefault();
        const input = (event.target as HTMLFormElement).elements.namedItem('message') as HTMLInputElement;
        const value = input?.value.trim();
        if (!value) return;
        chatsController.sendMessage(value);
        input.value = '';
      }
    });
  }

  render() {
    return this.compile(MessageInputTemplate);
  }
}
