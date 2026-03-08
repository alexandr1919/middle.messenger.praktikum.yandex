import { Block } from '../../../block';
import Router from '../../../router/Router';

import { BaseLinkTemplate } from './BaseLink.tmpl';
import { BaseLinkProps } from './BaseLink.types';

export class BaseLink extends Block {
  constructor(props: BaseLinkProps) {
    const { text, href = '', onClick } = props;
    super('a', {
      attributes: { class: 'base-link', href },
      children: { text },
      onClick: (e) => {
        e.preventDefault();
        if (onClick) {
          onClick(e);
        } else {
          Router.getInstance().go(href);
        }
      }
    });
  }

  render() {
    return this.compile(BaseLinkTemplate, this.props);
  }
}
