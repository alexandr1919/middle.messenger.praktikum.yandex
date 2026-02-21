import { Block } from '../../../block';
import { BaseLinkTemplate } from './BaseLink.tmpl';
import { BaseLinkProps } from './BaseLink.types';

export class BaseLink extends Block {
  constructor(props: BaseLinkProps) {
    const { text, href } = props;
    super('a', {
      attributes: { class: 'base-link', href },
      children: { text }
    });
  }

  render() {
    return this.compile(BaseLinkTemplate, this.props);
  }
}
