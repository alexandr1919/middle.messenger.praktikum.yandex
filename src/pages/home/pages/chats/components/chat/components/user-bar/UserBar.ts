import { Block } from '../../../../../../../../shared/block';
import { UserBarTemplate } from './UserBar.tmpl';
import { UserBarProps } from './UserBar.types';
import './user-bar.css';

export class UserBar extends Block {
  constructor(props: UserBarProps) {
    console.log(props);
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
