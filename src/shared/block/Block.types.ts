import type { Block } from './Block';

export type EventKey = `on${string}`;

export type WithEvents = {
  [key in EventKey]?: EventListener;
};

export type BlockProps = {
  attributes?: Record<string, string>;
  children?: Record<string, Block | string | number>;
} & WithEvents;

export type BlockEvent = {
  [key in EventKey]?: EventListener;
};
