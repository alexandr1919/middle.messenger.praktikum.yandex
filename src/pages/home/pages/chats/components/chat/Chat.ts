import { Block } from '../../../../../../shared/block';
import Store from '../../../../../../shared/store/Store';
import { StoreEvents } from '../../../../../../shared/store/Store.utils';
import { ChatsController } from '../../chats-layout/Chats.controller';

import { Message } from './components/message';
import { ChatTemplate } from './Chat.tmpl';
import { ChatProps, ChatWSMessage } from './Chat.types';
import './Chat.css';

const chatsController = ChatsController.getInstance();

export class Chat extends Block {
  constructor(props: ChatProps) {
    super('section', {
      ...props,
      attributes: { class: 'chat' }
    });
  }

  componentDidMount(): void {
    const chatId = (this.props as ChatProps).chatId;
    if (!chatId) return;

    Store.set('messages', []);

    void chatsController.getChatUsers(chatId).then((users) => {
      const membersMap = Object.fromEntries(users.map((u) => [u.id, u.login]));
      Store.set('chatMembers', membersMap);
    });

    void chatsController.getChatToken(chatId).then((token) => {
      const user = JSON.parse(localStorage.getItem('user') ?? '{}') as { id?: number };
      if (user.id) {
        chatsController.connectToChat(user.id, chatId, token);
      }
    });

    const onMessagesUpdate = () => {
      if (Store.getState().activeChat?.id !== chatId) {
        Store.off(StoreEvents.Updated, onMessagesUpdate);
        return;
      }

      const raw = Store.getState().messages as ChatWSMessage[] | undefined;
      if (!raw) return;

      const members = (Store.getState().chatMembers ?? {}) as Record<number, string>;

      this._children.messages = raw
        .filter((m) => m.type === 'message')
        .map(
          (m) =>
            new Message({
              text: m.content,
              time: new Date(m.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              user: members[m.user_id] ?? String(m.user_id)
            })
        );

      this._render();
    };

    Store.on(StoreEvents.Updated, onMessagesUpdate);
  }

  render() {
    return this.compile(ChatTemplate, { chatId: (this.props as ChatProps).chatId });
  }
}
