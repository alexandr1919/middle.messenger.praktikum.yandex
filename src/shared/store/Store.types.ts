import type { ChatModel } from '../../pages/home/pages/chats/chats-layout/Chat.types';
import type { WSMessage } from '../ws/WSTransport';

export type ActiveChat = {
  id: number;
  title: string;
};

export type StoreState = {
  isLoading?: boolean;
  chats?: ChatModel[];
  modal?: unknown;
  activeChat?: ActiveChat;
  chatMembers?: string[];
  messages?: WSMessage[];
};
