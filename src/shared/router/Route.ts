import { Block } from '../block';
import { render } from '../utils/ui-handlers';

import { RouteConfig } from './Router.types';

export default class Route {
  _pathname = '';
  _block: Block | null = null;
  _blockClass: (new () => Block) | null = null;
  _rootQuery = '#app';
  _isPublic = false;

  constructor(props: RouteConfig = {}) {
    const { pathname, block, isPublic }: RouteConfig = props;
    this._pathname = pathname ?? '';
    this._blockClass = block ?? null;
    this._isPublic = !!isPublic;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.getContent()?.remove();
      this._block?.hide();
      this._block = null;
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block && this._blockClass !== null) {
      this._block = new this._blockClass();
      render(this._rootQuery, this._block);
      return;
    }
    this._block?.show();
  }
}
