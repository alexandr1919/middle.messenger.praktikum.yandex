import Router from './shared/router/Router';
import { RouteConfig } from './shared/router/Router.types';
import { ROUTES } from './shared/router/Router.utils';
import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
  const router = Router.getInstance();
  ROUTES.forEach((route: RouteConfig) => router.use(route));
  router.start();
});
