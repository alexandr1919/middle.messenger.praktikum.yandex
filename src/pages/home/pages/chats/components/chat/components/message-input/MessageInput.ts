import { Block } from '../../../../../../../../shared/block';

import { MessageInputTemplate } from './MessageInput.tmpl';

export class MessageInput extends Block {
  constructor() {
    super('form', {
      attributes: { class: 'chat__form' },
      onSubmit(event: Event) {
        event.preventDefault();
        const value = (document.getElementsByName('message')[0] as HTMLInputElement).value;
        value && console.log('Message sent:', value);
      }
    });
  }

  render() {
    return this.compile(MessageInputTemplate);
  }
}
