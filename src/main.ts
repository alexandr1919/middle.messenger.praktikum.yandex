import { Login } from './pages/auth/login';
import { Registration } from './pages/auth/registration';
import { BaseLayout } from './shared/ui/base-layout/BaseLayout';
import { render } from './shared/utils/ui-handlers';
import { ChatsLayout } from './pages/home/pages/chats/chats-layout';
import { Sidebar } from './pages/home/components/sidebar';
import { Settings } from './pages/home/pages/settings';
import { Page404 } from './pages/error/page-404';
import './styles.css';

import type { Block } from './shared/block';
import { BaseHomeLayout } from './pages/home/base-home-layout';

const getBaseLayout = (content: string | number | Block) => {
  return new BaseLayout({
    children: {
      content
    }
  });
};

const getBaseHomeLayout = (content: string | number | Block, pathname: string) => {
  return new BaseHomeLayout({
    children: {
      sidebar: new Sidebar(),
      content
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const { pathname } = window.location;
  let pageComponent: Block | undefined;

  if (pathname === '/' || pathname === '/login') {
    pageComponent = getBaseLayout(new Login());
  }
  if (pathname === '/auth/registration') {
    pageComponent = getBaseLayout(new Registration());
  }
  if (pathname === '/home/chats') {
    pageComponent = getBaseHomeLayout(new ChatsLayout(), pathname);
  }
  if (pathname === '/home/settings') {
    pageComponent = getBaseHomeLayout(new Settings(), pathname);
  }
  if (!pageComponent) {
    pageComponent = getBaseLayout(new Page404());
  }

  pageComponent && render('#app', pageComponent);
});
