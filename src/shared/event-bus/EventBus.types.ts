export type Listeners = Record<string, ListenerCallback[]>;
export type ListenerCallback = (...args: unknown[]) => void;
