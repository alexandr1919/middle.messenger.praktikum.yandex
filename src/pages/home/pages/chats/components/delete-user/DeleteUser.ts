import { Block } from '../../../../../../shared/block';
import Store from '../../../../../../shared/store/Store';
import { Button } from '../../../../../../shared/ui/components/button/Button';
import { ChatsController } from '../../chats-layout/Chats.controller';

import { DeleteUserTemplate } from './DeleteUser.tmpl';

import type { UserModel } from '../../../../../../shared/user';

const chatsController = ChatsController.getInstance();

export class DeleteUser extends Block {
  private readonly _selectedIds = new Set<number>();

  constructor() {
    super('div', {
      attributes: { class: 'add-user' },
      children: {
        deleteFromChatButton: new Button({
          text: 'Delete user',
          onClick: () => {
            const chatId = Store.getState().activeChat?.id;
            if (!chatId) return;

            const btnEl = this._element?.querySelector<HTMLButtonElement>('button');
            if (btnEl) {
              btnEl.disabled = true;
              btnEl.textContent = '...Loading';
            }

            void chatsController
              .deleteUsers(chatId, [...this._selectedIds])
              .then(() => chatsController.getChatUsers(chatId))
              .then((users: UserModel[]) => {
                Store.set('chatMembers', users.map((u) => u.login));
                Store.set('modal', null);
              })
              .finally(() => {
                if (btnEl) {
                  btnEl.disabled = false;
                  btnEl.textContent = 'Delete user';
                }
              });
          }
        })
      }
    });
  }

  componentDidMount() {
    const btnEl = this._element?.querySelector<HTMLButtonElement>('button');
    if (btnEl) btnEl.disabled = true;

    const listEl = this._element?.querySelector<HTMLElement>('.add-user__users');
    const emptyEl = this._element?.querySelector<HTMLElement>('.add-user__empty');
    const members = Store.getState().chatMembers as string[] | undefined;

    if (!members || members.length === 0) {
      if (emptyEl) emptyEl.style.display = 'block';
      return;
    }

    // We need user ids — fetch them from the API
    const chatId = Store.getState().activeChat?.id;
    if (!chatId) return;

    void chatsController.getChatUsers(chatId).then((users: UserModel[]) => {
      users.forEach((user) => {
        const li = document.createElement('li');
        li.className = 'add-user__user-item';
        li.textContent = user.login;
        li.addEventListener('click', () => {
          if (this._selectedIds.has(user.id)) {
            this._selectedIds.delete(user.id);
            li.classList.remove('add-user__user-item--selected');
          } else {
            this._selectedIds.add(user.id);
            li.classList.add('add-user__user-item--selected');
          }
          if (btnEl) btnEl.disabled = this._selectedIds.size === 0;
        });
        listEl?.appendChild(li);
      });
    });
  }

  render() {
    return this.compile(DeleteUserTemplate, {});
  }
}
