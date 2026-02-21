import { BlockEvent, BlockProps, EventKey } from './Block.types';

export const EVENTS_LIST = {
  INIT: 'init',
  FLOW_CDM: 'flow:component-did-mount',
  FLOW_CDU: 'flow:component-did-unmount',
  FLOW_RENDER: 'flow:render'
};

export const getBlockEventsFromProps = (propsAndChildren: BlockProps): BlockEvent => {
  const events: BlockEvent = {};
  Object.entries(propsAndChildren).forEach(([key, value]) => {
    if (/^on[A-Z]/.test(key) && typeof value === 'function') {
      events[key as EventKey] = value as EventListener;
    }
  });
  return events;
};

export const toggleBlockEvents = (
  element: HTMLElement | null,
  blockEvents: BlockEvent,
  action: 'add' | 'remove'
): void => {
  Object.entries(blockEvents).forEach(([key, handler]) => {
    if (handler) {
      const eventName = key.slice(2).toLowerCase();
      if (action === 'add') {
        element?.addEventListener(eventName, handler);
      } else {
        element?.removeEventListener(eventName, handler);
      }
    }
  });
};
