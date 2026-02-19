import { Block } from '../../../../shared/block';

import { SidebarTemplate } from './Sidebar.tmpl';
import { SidebarProps } from './Sidebar.types';
import './Sidebar.css';

export class Sidebar extends Block {
  private isChats: boolean;
  private isSettings: boolean;

  constructor(props: SidebarProps) {
    super('aside', {
      attributes: { class: 'sidebar' }
    });
    this.isChats = props.isChats;
    this.isSettings = props.isSettings;
  }

  render() {
    return this.compile(SidebarTemplate, {
      isChats: this.isChats,
      isSettings: this.isSettings
    });
  }
}
