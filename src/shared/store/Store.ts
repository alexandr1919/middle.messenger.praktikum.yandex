import { EventBus } from '../event-bus';

import { StoreState } from './Store.types';
import { setState, StoreEvents } from './Store.utils';

export class Store extends EventBus {
  private state: StoreState = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    this.state = setState(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }

  public reset() {
    this.state = {};
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
