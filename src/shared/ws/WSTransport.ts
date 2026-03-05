export type WSMessage = {
  type: string;
  content?: string;
  [key: string]: unknown;
};

const PING_INTERVAL_MS = 30000;

export class WSTransport {
  private _socket: WebSocket | null = null;
  private readonly _url: string;
  private _pingInterval: ReturnType<typeof setInterval> | null = null;

  private _onOpen: (() => void) | null = null;
  private _onClose: ((event: CloseEvent) => void) | null = null;
  private _onMessage: ((data: WSMessage | WSMessage[]) => void) | null = null;
  private _onError: ((event: Event) => void) | null = null;

  constructor(url: string) {
    this._url = url;
  }

  connect(): void {
    this._socket = new WebSocket(this._url);

    this._socket.addEventListener('open', () => {
      console.log('Соединение установлено');
      this._pingInterval = setInterval(() => {
        this.send({ type: 'ping' });
      }, PING_INTERVAL_MS);
      if (this._onOpen) this._onOpen();
    });

    this._socket.addEventListener('close', (event) => {
      if (this._pingInterval !== null) {
        clearInterval(this._pingInterval);
        this._pingInterval = null;
      }
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      if (this._onClose) this._onClose(event);
    });

    this._socket.addEventListener('message', (event) => {
      console.log('Получены данные', event.data);
      try {
        const data = JSON.parse(event.data as string) as WSMessage | WSMessage[];
        if (this._onMessage) this._onMessage(data);
      } catch {
        console.log('Failed to parse message', event.data);
      }
    });

    this._socket.addEventListener('error', (event) => {
      console.log('Ошибка', (event as ErrorEvent).message);
      if (this._onError) this._onError(event);
    });
  }

  send(data: WSMessage): void {
    this._socket?.send(JSON.stringify(data));
  }

  close(): void {
    if (this._pingInterval !== null) {
      clearInterval(this._pingInterval);
      this._pingInterval = null;
    }
    this._socket?.close();
    this._socket = null;
  }

  onOpen(cb: () => void): this {
    this._onOpen = cb;
    return this;
  }

  onClose(cb: (event: CloseEvent) => void): this {
    this._onClose = cb;
    return this;
  }

  onMessage(cb: (data: WSMessage | WSMessage[]) => void): this {
    this._onMessage = cb;
    return this;
  }

  onError(cb: (event: Event) => void): this {
    this._onError = cb;
    return this;
  }
}
