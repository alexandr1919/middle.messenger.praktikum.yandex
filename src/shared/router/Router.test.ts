import { expect } from 'chai';

import Router from './Router';

describe('Router', () => {
  beforeEach(() => {
    (Router as unknown as Record<string, unknown>).instance = null;
  });

  it('getInstance should return a Router instance', () => {
    const router = Router.getInstance();
    expect(router).to.be.instanceOf(Router);
  });

  it('getInstance should return the same instance', () => {
    const a = Router.getInstance();
    const b = Router.getInstance();
    expect(a).to.equal(b);
  });

  it('use should add a route', () => {
    const router = Router.getInstance();
    router.use({ pathname: '/login' });
    expect(router.routes).to.have.length(1);
    expect(router.routes[0]._pathname).to.equal('/login');
  });

  it('getRoute should return correct route', () => {
    const router = Router.getInstance();
    router.use({ pathname: '/login' });
    router.use({ pathname: '/chats' });
    const route = router.getRoute('/chats');
    expect(route?._pathname).to.equal('/chats');
  });

  it('getRoute should return undefined if path unknown', () => {
    const router = Router.getInstance();
    router.use({ pathname: '/login' });
    const route = router.getRoute('/unknown');
    expect(route).to.equal(undefined);
  });

  it('go should update window.location.pathname', () => {
    const router = Router.getInstance();
    (router as unknown as Record<string, unknown>)._onRoute = () => {};
    router.go('/settings');
    expect(window.location.pathname).to.equal('/settings');
  });
});
