import { Block } from '../../../../../../shared/block';
import Store from '../../../../../../shared/store/Store';
import { UserController } from '../../../../../../shared/user';
import { Button } from '../../../../../../shared/ui/components/button/Button';
import { TextInput } from '../../../../../../shared/ui/components/text-input';
import { ChatsController } from '../../chats-layout/Chats.controller';

import { AddUserTemplate } from './AddUser.tmpl';

import type { UserModel } from '../../../../../../shared/user';

import './add-user.css';

const userController = new UserController();
const chatsController = ChatsController.getInstance();

export class AddUser extends Block {
  private readonly _selectedIds = new Set<number>();
  private _debounceTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    super('div', {
      attributes: { class: 'add-user' },
      children: {
        searchInput: new TextInput({
          name: 'search',
          placeholder: 'Search user',
          className: 'add-user__text-input',
          wrapperClassName: 'add-user__wrapper-text-input'
        }),
        addToChatButton: new Button({
          text: 'Add to chat',
          onClick: () => {
            const chatId = Store.getState().activeChat?.id;
            if (!chatId) return;

            const btnEl = this._element?.querySelector<HTMLButtonElement>('button');
            const inputEl = this._element?.querySelector<HTMLInputElement>('input[name="search"]');

            if (btnEl) {
              btnEl.disabled = true;
              btnEl.textContent = '...Loading';
            }
            if (inputEl) inputEl.disabled = true;

            void chatsController
              .addUsers(chatId, [...this._selectedIds])
              .then(() => chatsController.getChatUsers(chatId))
              .then((users: UserModel[]) => {
                Store.set(
                  'chatMembers',
                  users.map((u) => u.login)
                );
                Store.set('modal', null);
              })
              .finally(() => {
                if (btnEl) {
                  btnEl.disabled = false;
                  btnEl.textContent = 'Add to chat';
                }
                if (inputEl) inputEl.disabled = false;
              });
          }
        })
      },
      onInput: (e: Event) => {
        const input = e.target as HTMLInputElement;
        const value = input.value;
        const loadingEl = this._element?.querySelector<HTMLElement>('.add-user__loading');
        const emptyEl = this._element?.querySelector<HTMLElement>('.add-user__empty');
        const listEl = this._element?.querySelector<HTMLElement>('.add-user__users');
        const btnEl = this._element?.querySelector<HTMLButtonElement>('button');

        if (emptyEl) emptyEl.style.display = 'none';
        if (btnEl) btnEl.style.display = 'none';
        listEl?.querySelectorAll('.add-user__user-item').forEach((el) => el.remove());
        this._selectedIds.clear();

        if (!value) {
          if (loadingEl) loadingEl.style.display = 'none';
          return;
        }

        if (this._debounceTimer !== null) clearTimeout(this._debounceTimer);
        this._debounceTimer = window.setTimeout(() => {
          if (loadingEl) loadingEl.style.display = 'block';
          void userController
            .searchUsers(value)
            .then((users) => {
              if (loadingEl) loadingEl.style.display = 'none';
              if (users.length === 0) {
                if (emptyEl) emptyEl.style.display = 'block';
              } else {
                if (btnEl) {
                  btnEl.style.display = '';
                  btnEl.disabled = true;
                }
                users.forEach((user: UserModel) => {
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
              }
            })
            .catch(() => {
              if (loadingEl) loadingEl.style.display = 'none';
            });
        }, 300);
      }
    });
  }

  componentDidMount() {
    const btnEl = this._element?.querySelector<HTMLButtonElement>('button');
    if (btnEl) btnEl.style.display = 'none';
  }

  render() {
    return this.compile(AddUserTemplate, {});
  }
}
