import { Login } from '../../pages/auth/login';
import { Registration } from '../../pages/auth/registration';
import { BaseHomeLayout } from '../../pages/home/base-home-layout';
import { Sidebar } from '../../pages/home/components/sidebar';
import { ChatsLayout } from '../../pages/home/pages/chats/chats-layout';
import { Settings } from '../../pages/home/pages/settings';
import { Block } from '../block';
import { BaseLayout } from '../ui/base-layout';

import { RouteConfig } from './Router.types';
import { PATHS } from './paths';

export { PATHS };

export const getBaseLayout = (PageClass: new () => Block): new () => Block => {
  return class extends BaseLayout {
    constructor() {
      super({ children: { content: new PageClass() } });
    }
  };
};

const getBaseHomeLayout = (PageClass: new () => Block): new () => Block => {
  return class extends BaseHomeLayout {
    constructor() {
      super({ children: { sidebar: new Sidebar(), content: new PageClass() } });
    }
  };
};

export const DEFAULT_ROUTE = { pathname: PATHS.LOGIN, block: getBaseLayout(Login), isPublic: true };
export const DEFAULT_LOGGED_IN_ROUTE = { pathname: PATHS.CHATS, block: getBaseHomeLayout(ChatsLayout) };

export const ROUTES: RouteConfig[] = [
  DEFAULT_ROUTE,
  { pathname: PATHS.REGISTRATION, block: getBaseLayout(Registration), isPublic: true },
  DEFAULT_LOGGED_IN_ROUTE,
  { pathname: PATHS.SETTINGS, block: getBaseHomeLayout(Settings) }
];
