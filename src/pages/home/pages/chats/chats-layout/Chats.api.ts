import { BaseAPI } from '../../../../../shared/base-api/BaseApi';
import { Http } from '../../../../../shared/http/Http';
import { HttpErrorResponse, HttpResponse } from '../../../../../shared/http/Http.types';
import { UserModel } from '../../../../../shared/user/User.types';

import { ChatModel } from './Chat.types';

const http = new Http();

export class ChatsApi extends BaseAPI {
  async request(): Promise<HttpResponse<ChatModel[]>> {
    const res = await http.get<ChatModel[]>(this.BASE_URL + '/chats');
    if (res.status >= 400) {
      throw new Error((res.data as HttpErrorResponse)?.reason ?? 'Request failed');
    }
    return res;
  }

  async create(data: Record<string, unknown>): Promise<void> {
    const res = await http.post<void>(this.BASE_URL + '/chats', { data });
    if (res.status >= 400) {
      throw new Error((res.data as HttpErrorResponse)?.reason ?? 'Request failed');
    }
  }

  async delete(data: Record<string, unknown>): Promise<void> {
    const res = await http.delete<void>(this.BASE_URL + '/chats', { data });
    if (res.status >= 400) {
      throw new Error((res.data as HttpErrorResponse)?.reason ?? 'Request failed');
    }
  }

  async addUsers(chatId: number, users: number[]): Promise<void> {
    const res = await http.put<void>(this.BASE_URL + '/chats/users', {
      data: { users, chatId } as Record<string, unknown>
    });
    if (res.status >= 400) {
      throw new Error((res.data as HttpErrorResponse)?.reason ?? 'Request failed');
    }
  }

  async getChatUsers(chatId: number): Promise<UserModel[]> {
    const res = await http.get<UserModel[]>(this.BASE_URL + `/chats/${chatId}/users`);
    if (res.status >= 400) {
      throw new Error((res.data as HttpErrorResponse)?.reason ?? 'Request failed');
    }
    return res.data as UserModel[];
  }

  async deleteUsers(chatId: number, users: number[]): Promise<void> {
    const res = await http.delete<void>(this.BASE_URL + '/chats/users', {
      data: { users, chatId } as Record<string, unknown>
    });
    if (res.status >= 400) {
      throw new Error((res.data as HttpErrorResponse)?.reason ?? 'Request failed');
    }
  }

  async getChatToken(chatId: number): Promise<string> {
    const res = await http.post<{ token: string }>(this.BASE_URL + `/chats/token/${chatId}`, {});
    if (res.status >= 400) {
      throw new Error((res.data as HttpErrorResponse)?.reason ?? 'Request failed');
    }
    return (res.data as { token: string }).token;
  }
}
