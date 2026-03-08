import { Router, RouteConfig, ROUTES } from './shared/router';
import Store from './shared/store/Store';
import { UserController } from './shared/user';
import './styles.css';

document.addEventListener('DOMContentLoaded', async () => {
  const router = Router.getInstance();
  ROUTES.forEach((route: RouteConfig) => router.use(route));

  try {
    await new UserController().fetchUser();
  } catch {
    Store.set('user', null);
  }

  router.start();
});
