import { Block, BlockProps } from '../../block';
import { BaseLayoutTemplate } from './base-layout.tmpl';

export class BaseLayout extends Block {
  constructor(props: BlockProps) {
    super('section', { ...props, attributes: { class: 'main-wrapper' } });
  }

  render() {
    return this.compile(BaseLayoutTemplate);
  }
}
