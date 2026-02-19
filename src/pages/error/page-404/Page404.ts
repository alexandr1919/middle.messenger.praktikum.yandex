import { Block } from '../../../shared/block';
import { BaseLink } from '../../../shared/ui/components/base-link';

import { Page404Template } from './Page404.tmpl';
import './page-404.css';

export class Page404 extends Block {
  constructor() {
    super('main', {
      attributes: { class: 'error-page' },
      children: {
        backLink: new BaseLink({ text: 'Back to Login', href: '/' })
      }
    });
  }

  render() {
    return this.compile(Page404Template);
  }
}
