import { BaseAPI } from '../base-api/BaseApi';
import { Http } from '../http/Http';
import { HttpErrorResponse, HttpResponse } from '../http/Http.types';

import { UpdatePasswordPayload, UpdateProfilePayload, UserModel } from './User.types';

const http = new Http();

export class UserApi extends BaseAPI {
  async getUser(): Promise<HttpResponse<UserModel>> {
    const res = await http.get<UserModel>(this.BASE_URL + '/auth/user');
    if (res.status >= 400) {
      throw new Error((res.data as HttpErrorResponse)?.reason ?? 'Request failed');
    }
    return res;
  }

  async logout(): Promise<void> {
    const res = await http.post<void>(this.BASE_URL + '/auth/logout', { withCredentials: true });
    if (res.status >= 400) {
      throw new Error((res.data as HttpErrorResponse)?.reason ?? 'Request failed');
    }
  }

  async updateProfile(data: UpdateProfilePayload): Promise<HttpResponse<UserModel>> {
    const res = await http.put<UserModel>(this.BASE_URL + '/user/profile', { data: data as Record<string, unknown> });
    if (res.status >= 400) {
      throw new Error((res.data as HttpErrorResponse)?.reason ?? 'Request failed');
    }
    return res;
  }

  async updateAvatar(data: FormData): Promise<HttpResponse<UserModel>> {
    const res = await http.put<UserModel>(this.BASE_URL + '/user/profile/avatar', { data });
    if (res.status >= 400) {
      throw new Error((res.data as HttpErrorResponse)?.reason ?? 'Request failed');
    }
    return res;
  }

  async updatePassword(data: UpdatePasswordPayload): Promise<void> {
    const res = await http.put<void>(this.BASE_URL + '/user/password', { data: data as Record<string, unknown> });
    if (res.status >= 400) {
      throw new Error((res.data as HttpErrorResponse)?.reason ?? 'Request failed');
    }
  }

  async search(login: string): Promise<HttpResponse<UserModel[]>> {
    const res = await http.post<UserModel[]>(this.BASE_URL + '/user/search', { data: { login } });
    if (res.status >= 400) {
      throw new Error((res.data as HttpErrorResponse)?.reason ?? 'Request failed');
    }
    return res;
  }
}
