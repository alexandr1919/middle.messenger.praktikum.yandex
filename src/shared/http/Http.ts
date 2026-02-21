import { HttpMethod, HttpOptions, HttpResponse } from './Http.types';

const DEFAULT_TIMEOUT = 5000;

export class Http {
  private baseUrl: string;

  constructor(baseUrl = '') {
    this.baseUrl = baseUrl;
  }

  get<T>(url: string, options: HttpOptions = {}): Promise<HttpResponse<T>> {
    return this.request<T>(url, 'GET', options);
  }

  post<T>(url: string, options: HttpOptions = {}): Promise<HttpResponse<T>> {
    return this.request<T>(url, 'POST', options);
  }

  put<T>(url: string, options: HttpOptions = {}): Promise<HttpResponse<T>> {
    return this.request<T>(url, 'PUT', options);
  }

  patch<T>(url: string, options: HttpOptions = {}): Promise<HttpResponse<T>> {
    return this.request<T>(url, 'PATCH', options);
  }

  delete<T>(url: string, options: HttpOptions = {}): Promise<HttpResponse<T>> {
    return this.request<T>(url, 'DELETE', options);
  }

  private request<T>(url: string, method: HttpMethod, options: HttpOptions = {}): Promise<HttpResponse<T>> {
    const { headers = {}, data, timeout = DEFAULT_TIMEOUT, withCredentials = false } = options;

    return new Promise<HttpResponse<T>>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      const queryString =
        method === 'GET' && data && !(data instanceof FormData)
          ? '?' + new URLSearchParams(
              Object.entries(data).reduce<Record<string, string>>((acc, [k, v]) => {
                acc[k] = String(v);
                return acc;
              }, {})
            ).toString()
          : '';

      xhr.open(method, this.baseUrl + url + queryString);
      xhr.timeout = timeout;
      xhr.withCredentials = withCredentials;

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      if (data && !(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      xhr.onload = () => {
        let responseData: T;
        try {
          responseData = JSON.parse(xhr.responseText) as T;
        } catch {
          responseData = xhr.responseText as unknown as T;
        }
        resolve({ status: xhr.status, data: responseData });
      };

      xhr.onerror = () => reject(new Error('Network error'));
      xhr.ontimeout = () => reject(new Error(`Request timed out after ${timeout}ms`));

      if (method === 'GET' || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
