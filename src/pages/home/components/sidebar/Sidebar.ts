import { Block } from '../../../../shared/block';
import Router from '../../../../shared/router/Router';
import { PATHS } from '../../../../shared/router/Router.utils';
import Store from '../../../../shared/store/Store';
import { StoreEvents } from '../../../../shared/store/Store.utils';
import { UserController } from '../../../../shared/user';

import { SidebarTemplate } from './Sidebar.tmpl';

import './Sidebar.css';

export class Sidebar extends Block {
  constructor() {
    super('aside', {
      attributes: { class: 'sidebar' },
      onClick: ((event: Event) => {
        const anchor = (event.target as HTMLElement).closest<HTMLElement>('a[data-path]');
        if (!anchor) return;
        event.preventDefault();
        const path = anchor.getAttribute('data-path');
        if (path) {
          if (path === PATHS.LOGIN) {
            new UserController().logout();
            return;
          }
          Router.getInstance().go(path);
        }
      }) as EventListener
    });

    let prevIsLoading = Store.getState().isLoading ?? false;

    // кажется я допустил ошибку при выстраивании корневых компонентов и пока не знаю как отрефакторить
    //  поэтому в некоторых местах придется оставить этот костыль
    Store.on(StoreEvents.Updated, () => {
      const isLoading = Store.getState().isLoading ?? false;
      if (isLoading !== prevIsLoading) {
        prevIsLoading = isLoading;
        this._eventBus?.emit(Block.EVENTS.FLOW_RENDER);
      }
    });
  }

  render() {
    const path = window.location.pathname;
    return this.compile(SidebarTemplate, {
      isChats: path === PATHS.CHATS,
      isSettings: path === PATHS.SETTINGS,
      chatsPath: PATHS.CHATS,
      settingsPath: PATHS.SETTINGS,
      loginPath: PATHS.LOGIN,
      isLoading: Store.getState().isLoading
    });
  }
}
