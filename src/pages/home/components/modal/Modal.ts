import { Block } from '../../../../shared/block';
import Store from '../../../../shared/store/Store';
import { StoreEvents } from '../../../../shared/store/Store.utils';
import { BaseLink } from '../../../../shared/ui/components/base-link/BaseLink';

import { ModalTemplate } from './Modal.tmpl';

import './Modal.css';

export class Modal extends Block {
  constructor() {
    super('div', {
      attributes: { class: 'modal-wrapper' },
      children: {
        title: 'Set chat title',
        closeLink: new BaseLink({
          text: 'Close',
          onClick: () => Store.set('modal', null)
        })
      }
    });
  }

  componentDidMount() {
    this.hide();

    Store.on(StoreEvents.Updated, () => {
      const content = Store.getState().modal;

      if (content instanceof Block) {
        this._children.content = content;
        this._render();
        this.show();
      } else {
        this.hide();
      }
    });
  }

  render() {
    return this.compile(ModalTemplate);
  }
}
