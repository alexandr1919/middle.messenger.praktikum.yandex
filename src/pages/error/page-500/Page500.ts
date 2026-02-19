import { Block } from '../../../shared/block';
import { BaseLink } from '../../../shared/ui/components/base-link';

import { Page500Template } from './Page500.tmpl';
import './page-500.css';

export class Page500 extends Block {
  constructor() {
    super('main', {
      attributes: { class: 'error-page' },
      children: {
        backLink: new BaseLink({ text: 'Back to Login', href: '/' })
      }
    });
  }

  render() {
    return this.compile(Page500Template);
  }
}
