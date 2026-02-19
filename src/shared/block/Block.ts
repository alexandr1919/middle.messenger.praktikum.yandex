import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';

import { EventBus } from '../event-bus/EventBus';
import { ListenerCallback } from '../event-bus/EventBus.types';

import { BlockEvent, BlockProps } from './Block.types';
import { EVENTS_LIST, getBlockEventsFromProps, toggleBlockEvents } from './Block.utils';

export class Block {
  static EVENTS = EVENTS_LIST;

  props: BlockProps = {};
  _children: Record<string, Block | Block[] | string | number> = {};
  _id: string;
  _element: HTMLElement | null = null;
  _eventBus: EventBus | null = null;
  _tagName = 'div';
  _attributes: Record<string, string> = {};
  _blockEvents: BlockEvent = {};

  constructor(tagName = 'div', propsAndChildren: BlockProps = {}) {
    this._id = makeUUID();
    this._tagName = tagName;
    this._eventBus = new EventBus();
    this._blockEvents = getBlockEventsFromProps(propsAndChildren);
    const { children, attributes } = propsAndChildren;
    this._children = children || {};
    this._attributes = this.makePropsProxy({ ...attributes, __id: this._id });
    this.props = propsAndChildren;

    this.registerEvents();
    this._eventBus?.emit(Block.EVENTS.INIT);
  }

  registerEvents(): void {
    this._eventBus?.on(Block.EVENTS.INIT, this.init.bind(this));
    this._eventBus?.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    this._eventBus?.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as ListenerCallback);
    this._eventBus?.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init(): void {
    this._element = this._createDocumentElement(this._tagName);
    this.addAttributes();
    this._eventBus?.emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount(): void {
    this.componentDidMount();
  }

  componentDidMount(): void {}

  componentDidUpdate(_oldProps: BlockProps, _newProps: BlockProps): boolean {
    return true;
  }

  private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
    const needRerender = this.componentDidUpdate(oldProps, newProps);
    if (!needRerender) return;
    this._render();
  }

  dispatchComponentDidMount(): void {
    this._eventBus?.emit(Block.EVENTS.FLOW_CDM);
  }

  _handleBlockEvents(action: 'add' | 'remove'): void {
    toggleBlockEvents(this._element, this._blockEvents, action);
  }

  setProps = (nextProps: BlockProps): void => {
    if (!nextProps) return;
    Object.assign(this._attributes, nextProps);
  };

  _render(): void {
    if (!this._element) {
      throw new Error('Element not initialized.');
    }
    toggleBlockEvents(this._element, this._blockEvents, 'remove');
    toggleBlockEvents(this._element, this._blockEvents, 'add');
    this._handleBlockEvents('remove');
    this._handleBlockEvents('add');
    this.addAttributes();
    const component = this.render();
    this._element.innerHTML = '';
    this._element.appendChild(component);
  }

  render(): DocumentFragment {
    return document.createDocumentFragment();
  }

  getContent(): HTMLElement | null {
    return this._element;
  }

  makePropsProxy<T extends Record<string, unknown>>(props: T): T {
    return new Proxy(props, {
      get(target: T, prop: string | symbol): unknown {
        if (typeof prop === 'symbol') return undefined;
        const value = target[prop as keyof T];
        return typeof value === 'function' ? (value as (...args: unknown[]) => unknown).bind(target) : value;
      },
      set: (target: T, prop: string | symbol, value: unknown): boolean => {
        if (typeof prop === 'symbol') return true;
        const oldProps = { ...target };
        if ((target as Record<string, unknown>)[prop as string] !== value) {
          (target as Record<string, unknown>)[prop as string] = value;
          this._eventBus?.emit(Block.EVENTS.FLOW_CDU, oldProps, { ...target });
        }
        return true;
      },
      deleteProperty(): boolean {
        throw new Error('Нет доступа к удалению props');
      }
    });
  }

  _createDocumentElement(tag: string): HTMLElement {
    const element = document.createElement(tag);
    element.setAttribute('data-id', this._id);
    return element;
  }

  addAttributes(): void {
    Object.entries(this._attributes).forEach(([key, value]) => {
      this._element?.setAttribute(key, value);
    });
  }

  compile(template: string, props: Record<string, unknown> = {}): DocumentFragment {
    const propsAndStubs: Record<string, unknown> = { ...props };

    Object.entries(this._children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((c) => `<div data-id="${c._id}"></div>`);
      } else if (child instanceof Block) {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      } else {
        propsAndStubs[key] = child;
      }
    });

    const fragment = this._createDocumentElement('template') as unknown as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);

    Object.entries(this._children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        child.forEach((c) => {
          const stub = fragment.content.querySelector(`[data-id="${c._id}"]`);
          if (!stub) {
            console.error(
              `Template syntax error: stub not found for child component with id ${c._id} in array "${key}"`
            );
            return;
          }
          const content = c.getContent();
          if (content) stub.replaceWith(content);
        });
      } else if (child instanceof Block) {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        if (!stub) {
          console.error(`Template syntax error: stub not found for child component with id ${child._id}`);
          return;
        }
        const content = child.getContent();
        if (content) stub.replaceWith(content);
      }
    });

    return fragment.content;
  }
}
