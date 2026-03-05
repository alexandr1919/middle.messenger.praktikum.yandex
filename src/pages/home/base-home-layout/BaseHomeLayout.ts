import { Block, BlockProps } from '../../../shared/block';
import { Modal } from '../components/modal';

import { BaseHomeLayoutTemplate } from './base-home-layout.tmpl';

import './base-home-layout.css';

export class BaseHomeLayout extends Block {
  constructor(props: BlockProps) {
    super('section', {
      ...props,
      attributes: { class: 'inner-wrapper' },
      children: {
        ...props.children,
        modal: new Modal()
      }
    });
  }

  render() {
    return this.compile(BaseHomeLayoutTemplate);
  }
}
