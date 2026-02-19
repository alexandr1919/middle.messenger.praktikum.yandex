import { Block } from '../../../../../../../../shared/block';

import { MessageInputTemplate } from './MessageInput.tmpl';
import './message-input.css';

export class MessageInput extends Block {
  constructor() {
    super('form', {
      attributes: { class: 'chat__form' },
      onSubmit(event: Event) {
        event.preventDefault();
        const value = (document.getElementsByName('message')[0] as HTMLInputElement).value;
        console.log('Message: ', value);
      }
    });
  }

  render() {
    return this.compile(MessageInputTemplate);
  }
}
