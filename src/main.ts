import { Router, RouteConfig, ROUTES } from './shared/router';
import './styles.css';

document.addEventListener('DOMContentLoaded', () => {
  const router = Router.getInstance();
  ROUTES.forEach((route: RouteConfig) => router.use(route));
  router.start();
});
