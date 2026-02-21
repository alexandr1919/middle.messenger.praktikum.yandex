import { Block } from '../../../../../../../../shared/block';

import { UserBarTemplate } from './UserBar.tmpl';
import { UserBarProps } from './UserBar.types';

export class UserBar extends Block {
  constructor(props: UserBarProps) {
    const { user } = props;
    super('div', {
      attributes: { class: 'chat__user' },
      children: { user }
    });
  }

  render() {
    return this.compile(UserBarTemplate);
  }
}
