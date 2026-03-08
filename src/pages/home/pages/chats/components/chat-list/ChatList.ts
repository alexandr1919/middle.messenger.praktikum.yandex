import { Block } from '../../../../../../shared/block';
import Store from '../../../../../../shared/store/Store';
import { Button } from '../../../../../../shared/ui/components/button/Button';
import { AddChat } from '../add-chat';

import { ChatListTemplate } from './ChatList.tmpl';
import { ChatListProps } from './ChatList.types';
import './ChatList.css';

export class ChatList extends Block {
  constructor(props: ChatListProps) {
    super('ul', {
      ...props,
      attributes: { class: 'main-menu' },
      children: {
        ...props.children,
        addButton: new Button({
          text: '+',
          className: 'button--round',
          onClick: () => Store.set('modal', new AddChat())
        })
      }
    });
  }

  render() {
    return this.compile(ChatListTemplate);
  }
}
