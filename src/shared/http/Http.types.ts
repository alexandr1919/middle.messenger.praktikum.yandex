export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type HttpOptions = {
  headers?: Record<string, string>;
  data?: Record<string, unknown> | FormData;
  timeout?: number;
  withCredentials?: boolean;
};

export type HttpErrorResponse = {
  reason?: string;
};

export type HttpResponse<T = unknown> = {
  status: number;
  data: T | HttpErrorResponse;
};
