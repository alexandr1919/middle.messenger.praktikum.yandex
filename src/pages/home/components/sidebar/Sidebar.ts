import { Block } from '../../../../shared/block';

import { SidebarTemplate } from './Sidebar.tmpl';
import './Sidebar.css';

export class Sidebar extends Block {
  constructor() {
    super('aside', {
      attributes: { class: 'sidebar' }
    });
  }

  render() {
    const path = window.location.pathname;
    return this.compile(SidebarTemplate, {
      isChats: path === '/home/chats',
      isSettings: path === '/home/settings'
    });
  }
}
