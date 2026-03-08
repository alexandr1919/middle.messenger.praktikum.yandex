import { Block } from '../../../../../../../../shared/block';

import { MessageTemplate } from './Message.tmpl';
import { MessageProps } from './Message.types';
import './message.css';

export class Message extends Block {
  constructor(props: MessageProps) {
    const { text, time, user } = props;
    super('li', {
      ...props,
      attributes: { class: 'message' },
      children: { text, time, user: user ?? '' }
    });
  }

  render() {
    return this.compile(MessageTemplate);
  }
}
