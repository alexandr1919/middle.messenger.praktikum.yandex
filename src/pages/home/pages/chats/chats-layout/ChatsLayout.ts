import { Block } from '../../../../../shared/block';
import { Chat } from '../components/chat';
import { ChatList } from '../components/chat-list';
import { ChatListItem } from '../components/chat-list/components/chat-list-item';
import { Message } from '../components/chat/components/message';
import { UserBar } from '../components/chat/components/user-bar';
import { MessageInput } from '../components/chat/components/message-input';
import { defaultChats, defaultMessages } from '../__mocks__/chat-mocks';

import { ChatsLayoutTemplate } from './chats-layout.tmpl';

import './chats-layout.css';

export class ChatsLayout extends Block {
  constructor() {
    super('section', {
      attributes: { class: 'home-wrapper' },
      children: {
        chatlist: new ChatList({
          children: {
            items: defaultChats.map((c) => new ChatListItem(c))
          }
        }),
        chat: new Chat({
          children: {
            messages: defaultMessages.map((m) => new Message(m)),
            userBar: new UserBar({ user: 'username_1' }),
            messageInput: new MessageInput()
          }
        })
      }
    });
  }

  render() {
    return this.compile(ChatsLayoutTemplate);
  }
}
