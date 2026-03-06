import { Page404 } from '../../pages/error/page-404';
import Store from '../store/Store';

import Route from './Route';
import { RouteConfig } from './Router.types';
import { DEFAULT_LOGGED_IN_ROUTE, DEFAULT_ROUTE, getBaseLayout, PATHS } from './Router.utils';

export default class Router {
  private static instance: Router;
  public routes: Route[] = [];
  public history: History = window.history;
  private _currentRoute: Route | null = null;

  private constructor() {}

  static getInstance() {
    if (!Router.instance) {
      Router.instance = new Router();
    }
    return Router.instance;
  }

  use(props: RouteConfig) {
    const route = new Route(props);
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    let route = this.getRoute(pathname);
    if (!route) {
      route = new Route({ pathname: '', block: getBaseLayout(Page404) });
    } else if (!Store.getState().user && !route._isPublic) {
      route = new Route(DEFAULT_ROUTE);
      this.history.pushState({}, '', PATHS.LOGIN);
    } else if (Store.getState().user && route._isPublic) {
      route = new Route(DEFAULT_LOGGED_IN_ROUTE);
      this.history.pushState({}, '', PATHS.CHATS);
    }
    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find((route: Route) => route.match(pathname));
  }
}
