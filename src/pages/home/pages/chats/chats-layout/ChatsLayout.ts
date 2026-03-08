import { Block } from '../../../../../shared/block';
import Store from '../../../../../shared/store/Store';
import { StoreEvents } from '../../../../../shared/store/Store.utils';
import { Chat } from '../components/chat';
import { MessageInput } from '../components/chat/components/message-input';
import { ChatBar } from '../components/chat/components/chat-bar';
import { ChatList } from '../components/chat-list';
import { ChatListItem } from '../components/chat-list/components/chat-list-item';

import { ChatsLayoutTemplate } from './chats-layout.tmpl';
import { ChatsController } from './Chats.controller';
import { ChatModel } from './Chat.types';

import './chats-layout.css';

const chatsController = ChatsController.getInstance();

export class ChatsLayout extends Block {
  constructor() {
    super('section', {
      attributes: { class: 'home-wrapper' },
      children: {
        chatlist: new ChatList({ children: { items: [] } }),
        chat: new Chat({
          // children: {
          //   messages: defaultMessages.map((m) => new Message(m)),
          //   chatBar: new ChatBar({ title: 'username_1' }),
          //   messageInput: new MessageInput()
          // }
        })
      }
    });
  }

  componentDidMount() {
    chatsController.getChats();

    let prevActiveChatId: number | undefined;
    let prevChats: ChatModel[] | undefined;

    Store.on(StoreEvents.Updated, () => {
      const chats = Store.getState().chats as ChatModel[];
      const activeChat = Store.getState().activeChat;
      let needRender = false;

      if (chats && chats !== prevChats) {
        prevChats = chats;
        this._children.chatlist = new ChatList({
          children: {
            items: chats.map((c) => {
              const { id, title, last_message, unread_count } = c;
              return new ChatListItem({
                unreadCount: unread_count,
                title,
                id,
                preview: last_message?.content ?? ''
              });
            })
          }
        });
        needRender = true;
      }

      if (activeChat && activeChat.id !== prevActiveChatId) {
        prevActiveChatId = activeChat.id;
        const { title } = activeChat;
        this._children.chat = new Chat({
          chatId: activeChat.id,
          children: {
            chatBar: new ChatBar({ title }),
            messages: [],
            messageInput: new MessageInput()
          }
        });
        needRender = true;
      }

      if (needRender) {
        this._render();
      }
    });
  }

  render() {
    return this.compile(ChatsLayoutTemplate);
  }
}
