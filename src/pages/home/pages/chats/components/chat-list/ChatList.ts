import { Block } from '../../../../../../shared/block';

import { ChatListTemplate } from './ChatList.tmpl';
import { ChatListProps } from './ChatList.types';
import './ChatList.css';

export class ChatList extends Block {
  constructor(props: ChatListProps) {
    super('ul', {
      ...props,
      attributes: { class: 'main-menu' }
    });
  }

  render() {
    return this.compile(ChatListTemplate);
  }
}
