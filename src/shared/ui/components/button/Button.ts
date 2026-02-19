import { Block } from '../../../block';
import { ButtonTemplate } from './Button.tmpl';

import { ButtonProps } from './Button.types';
import './button.css';

export class Button extends Block {
  constructor(props: ButtonProps) {
    const { text, type } = props;
    super('button', {
      attributes: { class: 'button', type: type || 'button' },
      children: { text }
    });
  }

  render() {
    return this.compile(ButtonTemplate, this.props);
  }
}
