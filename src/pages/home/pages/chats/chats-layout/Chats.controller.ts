import Store from '../../../../../shared/store/Store';
import { UserModel } from '../../../../../shared/user/User.types';
import { WS_CHATS_URL } from '../../../../../shared/config';
import { WSTransport } from '../../../../../shared/ws/WSTransport';

import { ChatsApi } from './Chats.api';

const chatsApi = new ChatsApi();

export class ChatsController {
  private static _instance: ChatsController;
  private _transport: WSTransport | null = null;

  static getInstance(): ChatsController {
    if (!ChatsController._instance) {
      ChatsController._instance = new ChatsController();
    }
    return ChatsController._instance;
  }

  async getChats(): Promise<void> {
    const res = await chatsApi.request();
    Store.set('chats', res.data);
  }

  async addUsers(chatId: number, users: number[]): Promise<void> {
    await chatsApi.addUsers(chatId, users);
  }

  async deleteUsers(chatId: number, users: number[]): Promise<void> {
    await chatsApi.deleteUsers(chatId, users);
  }

  async getChatUsers(chatId: number): Promise<UserModel[]> {
    return chatsApi.getChatUsers(chatId);
  }

  async getChatToken(chatId: number): Promise<string> {
    return chatsApi.getChatToken(chatId);
  }

  connectToChat(userId: number, chatId: number, token: string): void {
    this._transport?.close();

    this._transport = new WSTransport(`${WS_CHATS_URL}/${userId}/${chatId}/${token}`);

    this._transport
      .onOpen(() => {
        this._transport?.send({ content: '0', type: 'get old' });
      })
      .onMessage((data) => {
        if (Array.isArray(data)) {
          Store.set('messages', data as unknown[]);
        } else {
          const current = (Store.getState().messages ?? []) as unknown[];
          Store.set('messages', [data as unknown, ...current]);
        }
      })
      .onClose(() => {})
      .onError(() => {});

    this._transport.connect();
  }

  sendMessage(content: string): void {
    this._transport?.send({ content, type: 'message' });
  }
}
