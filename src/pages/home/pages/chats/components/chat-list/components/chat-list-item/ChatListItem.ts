import { Block } from '../../../../../../../../shared/block';
import Store from '../../../../../../../../shared/store/Store';
import { StoreEvents } from '../../../../../../../../shared/store/Store.utils';

import { ChatListItemTemplate } from './ChatListItem.tmpl';
import { ChatListItemProps } from './ChatListItem.types';

export class ChatListItem extends Block {
  private readonly chatId: number;

  constructor({ id, title, preview, unreadCount }: ChatListItemProps) {
    super('li', {
      attributes: { class: 'chat-list__item' },
      children: { title, preview, unreadCount },
      onClick: () => {
        Store.set('activeChat', { id, title });
      }
    });

    this.chatId = id;
  }

  componentDidMount() {
    const update = () => {
      const isActive = Store.getState().activeChat?.id === this.chatId;
      this._element?.classList.toggle('chat-list__item--active', isActive);
    };
    Store.on(StoreEvents.Updated, update);
    update();
  }

  render() {
    return this.compile(ChatListItemTemplate, {});
  }
}
