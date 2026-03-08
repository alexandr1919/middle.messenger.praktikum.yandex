import { Block } from '../../../../../../../../shared/block';
import Store from '../../../../../../../../shared/store/Store';
import { StoreEvents } from '../../../../../../../../shared/store/Store.utils';
import { Button } from '../../../../../../../../shared/ui/components/button/Button';
import { AddUser } from '../../../add-user';
import { DeleteUser } from '../../../delete-user';

import { ChatBarTemplate } from './ChatBar.tmpl';
import { ChatBarProps } from './ChatBar.types';

export class ChatBar extends Block {
  constructor(props: ChatBarProps) {
    const { title } = props;
    super('div', {
      attributes: { class: 'chat__user' },
      children: {
        title,
        addUserButton: new Button({
          text: 'Add user',
          onClick: () => Store.set('modal', new AddUser())
        })
      }
    });
  }

  componentDidMount() {
    const infoEl = this._element?.querySelector<HTMLElement>('.chat__user-info');
    infoEl?.addEventListener('click', () => {
      Store.set('modal', new DeleteUser());
    });

    Store.on(StoreEvents.Updated, () => {
      const members = Store.getState().chatMembers as Record<number, string> | undefined;
      const membersEl = this._element?.querySelector<HTMLElement>('.chat__user-members');
      if (membersEl) {
        membersEl.textContent = members ? Object.values(members).join(', ') : '';
      }
    });
  }

  render() {
    return this.compile(ChatBarTemplate);
  }
}
