import { Block } from '../../../../../../../../shared/block';
import { MessageTemplate } from './Message.tmpl';
import { MessageProps } from './Message.types';
import './message.css';

export class Message extends Block {
  constructor(props: MessageProps) {
    const { text, time } = props;
    super('li', {
      ...props,
      attributes: { class: 'message' },
      children: { text, time }
    });
  }

  render() {
    return this.compile(MessageTemplate);
  }
}
