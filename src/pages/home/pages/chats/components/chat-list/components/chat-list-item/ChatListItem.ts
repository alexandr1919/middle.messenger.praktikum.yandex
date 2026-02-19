import { Block } from '../../../../../../../../shared/block';
import { ChatListItemTemplate } from './ChatListItem.tmpl';
import { ChatListItemProps } from './ChatListItem.types';

export class ChatListItem extends Block {
  constructor(props: ChatListItemProps) {
    const { name, preview } = props;
    super('li', {
      attributes: { class: 'chat-list__item' },
      children: { name, preview }
    });
  }

  render() {
    // console.log(this.name, this.preview);
    return this.compile(ChatListItemTemplate);
  }
}
