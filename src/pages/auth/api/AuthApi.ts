import { BaseAPI } from '../../../shared/base-api/BaseApi';
import { Http } from '../../../shared/http/Http';
import { HttpErrorResponse, HttpResponse } from '../../../shared/http/Http.types';

const http = new Http();

export class AuthApi<T> extends BaseAPI<HttpResponse<T>> {
  apiPath = '';
  async create(data: Record<string, unknown>): Promise<HttpResponse<T>> {
    const res = await http.post<T>(this.BASE_URL + this.apiPath, { data: data, withCredentials: true });
    if (res.status >= 400) {
      throw new Error((res.data as HttpErrorResponse)?.reason ?? 'Request failed');
    }
    return res;
  }
}
