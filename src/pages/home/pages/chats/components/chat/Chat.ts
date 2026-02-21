import { Block } from '../../../../../../shared/block';

import { ChatTemplate } from './Chat.tmpl';
import { ChatProps } from './Chat.types';
import './Chat.css';

export class Chat extends Block {
  constructor(props: ChatProps) {
    super('section', {
      ...props,
      attributes: { class: 'chat' }
    });
  }

  render() {
    return this.compile(ChatTemplate);
  }
}
