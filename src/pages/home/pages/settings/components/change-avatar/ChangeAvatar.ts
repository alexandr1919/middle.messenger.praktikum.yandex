import { Block } from '../../../../../../shared/block';
import '../../../../../../shared/ui/components/button/button.css';
import { UserController, UserModel } from '../../../../../../shared/user';

import { ChangeAvatarTemplate } from './ChangeAvatar.tmpl';
import './change-avatar.css';

const RESOURCES_URL = 'https://ya-praktikum.tech/api/v2/resources';

export class ChangeAvatar extends Block {
  private error = '';

  constructor() {
    const upload = { handler: undefined as ((files: FileList) => void) | undefined };

    super('div', {
      attributes: { class: 'change-avatar' },
      onChange: ((event: Event) => {
        const input = event.target as HTMLInputElement;
        if (input.type !== 'file' || !input.files?.[0]) return;
        upload.handler?.(input.files);
      }) as EventListener
    });

    upload.handler = (files: FileList) => this.uploadAvatar(files[0]);
  }

  private async uploadAvatar(file: File): Promise<void> {
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      await new UserController().updateAvatar(formData);
      this.error = '';
    } catch (err) {
      this.error = err instanceof Error ? err.message : 'Upload failed';
    }
    this._eventBus?.emit(Block.EVENTS.FLOW_RENDER);
  }

  render() {
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? (JSON.parse(storedUser) as UserModel) : null;
    const avatarSrc = user?.avatar ? RESOURCES_URL + user.avatar : '';
    return this.compile(ChangeAvatarTemplate, { avatarSrc, error: this.error });
  }
}
