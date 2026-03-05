import { Block } from '../../../../shared/block';

import { ChangeAvatar } from './components/change-avatar';
import { ChangePassword } from './components/change-password';
import { UserSettings } from './components/user-settings';
import { SettingsTemplate } from './Settings.tmpl';
import './settings.css';

export class Settings extends Block {
  constructor() {
    super('div', {
      attributes: { class: 'settings__content' },
      children: {
        changeAvatar: new ChangeAvatar(),
        userSettings: new UserSettings(),
        changePassword: new ChangePassword()
      }
    });
  }

  render() {
    return this.compile(SettingsTemplate);
  }
}
