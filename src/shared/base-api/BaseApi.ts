import { API_BASE_URL } from '../config';

export class BaseAPI<T = unknown> {
  BASE_URL = API_BASE_URL;
  create(..._args: unknown[]): Promise<T> {
    throw new Error('Not implemented');
  }

  request(..._args: unknown[]): Promise<T> {
    throw new Error('Not implemented');
  }

  update(..._args: unknown[]): Promise<T> {
    throw new Error('Not implemented');
  }

  delete(..._args: unknown[]): Promise<T> {
    throw new Error('Not implemented');
  }
}
