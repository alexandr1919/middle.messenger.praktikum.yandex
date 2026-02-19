import { Block, BlockProps } from '../../../shared/block';
import { BaseHomeLayoutTemplate } from './base-home-layout.tmpl';

import './base-home-layout.css';

export class BaseHomeLayout extends Block {
  constructor(props: BlockProps) {
    super('section', { ...props, attributes: { class: 'inner-wrapper' } });
  }

  render() {
    return this.compile(BaseHomeLayoutTemplate);
  }
}
