import { ListenerCallback, Listeners } from './EventBus.types';

export class EventBus {
  private listeners: Listeners = {};
  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: ListenerCallback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: ListenerCallback) {
    if (!this.listeners[event]) {
      throw new Error(`No event found: ${event}`);
    }
    this.listeners[event] = this.listeners[event].filter((listener: ListenerCallback) => listener !== callback);
  }

  emit(event: string, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`No event found: ${event}`);
    }
    this.listeners[event].forEach((listener) => listener(...args));
  }
}
