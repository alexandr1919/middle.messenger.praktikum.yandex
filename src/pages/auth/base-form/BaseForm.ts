import { Block } from '../../../shared/block';
import { BlockProps } from '../../../shared/block/Block.types';
import Store from '../../../shared/store/Store';
import { TextInput } from '../../../shared/ui/components/text-input';

import { BaseFormProps } from './BaseForm.types';
import './base-form.css';

export abstract class BaseForm<T> extends Block {
  formValues: string[] = [];
  inputs: Record<string, TextInput> = {};
  error = '';
  successMessage = '';
  private _buttonText = '';
  abstract handleSubmit(data: Partial<T>): Promise<void>;

  constructor(props: BaseFormProps) {
    const inputs = Object.entries(props.children || {}).reduce<Record<string, TextInput>>((acc, [key, value]) => {
      if (value instanceof TextInput) acc[key] = value;
      return acc;
    }, {});

    const submit = { handler: undefined as (() => void) | undefined };

    super('form', {
      ...props,
      attributes: { class: props.class || 'modal' },
      onSubmit: (event: Event) => {
        event.preventDefault();
        let isValid = true;
        Object.values(inputs).forEach((textInput) => {
          const inputElement = (event.currentTarget as HTMLFormElement).querySelector<HTMLInputElement>(`[name="${textInput.name}"]`);
          if (!inputElement) return;
          const inputElementValue = inputElement.value;
          const errorSpan = inputElement.parentElement?.querySelector<HTMLElement>('.text-input__error');
          const { term, required } = textInput.validators?.onSubmit || {};
          let inputValid = true;
          if (term && !term.test(inputElementValue)) inputValid = false;
          if (required && !inputElementValue) inputValid = false;
          inputElement.classList.toggle('text-input--error', !inputValid);
          if (errorSpan) errorSpan.textContent = inputValid ? '' : textInput.errorMessage;
          if (!inputValid) isValid = false;
        });
        if (!isValid) return;
        submit.handler?.();
      }
    });

    submit.handler = () => this.onSubmit();

    this.inputs = inputs;

    const buttonChild = this.getChild('button');
    if (buttonChild instanceof Block) {
      this._buttonText = (buttonChild.getChild('text') as string) ?? '';
    }

  }

  componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): boolean {
    const oldLoading = (oldProps as BlockProps & { isLoading?: boolean }).isLoading;
    const newLoading = (newProps as BlockProps & { isLoading?: boolean }).isLoading;
    if (oldLoading !== newLoading) {
      this._setLoadingUiState(newLoading ?? false);
    }
    return true;
  }

  private _setLoadingUiState(loading: boolean) {
    const buttonChild = this.getChild('button');
    if (buttonChild instanceof Block) {
      const buttonEl = buttonChild.getContent();
      if (buttonEl) {
        buttonEl.textContent = loading ? '...Loading' : this._buttonText;
        if (loading) {
          buttonEl.setAttribute('disabled', 'disabled');
        } else {
          buttonEl.removeAttribute('disabled');
        }
      }
    }

    const linkChild = this.getChild('redirectLink');
    if (linkChild instanceof Block) {
      const linkEl = linkChild.getContent();
      if (linkEl) {
        if (loading) {
          linkEl.setAttribute('aria-disabled', 'true');
          linkEl.style.pointerEvents = 'none';
        } else {
          linkEl.removeAttribute('aria-disabled');
          linkEl.style.pointerEvents = '';
        }
      }
    }

    Object.values(this.inputs).forEach((input) => {
      const el = this._element?.querySelector<HTMLInputElement>(`[name="${input.name}"]`);
      if (el) el.disabled = loading;
    });
  }

  updateError(text: string = '') {
    this.error = text;
    this._eventBus?.emit(Block.EVENTS.FLOW_RENDER);
  }

  updateSuccess(text: string = '') {
    this.successMessage = text;
    this._eventBus?.emit(Block.EVENTS.FLOW_RENDER);
  }

  async onSubmit() {
    this.updateError();
    this.updateSuccess();
    const formValues: Partial<T> = {};
    this.formValues.forEach((name) => {
      const element = this._element?.querySelector<HTMLInputElement>(`[name="${name}"]`);
      if (element) {
        formValues[name as keyof T] = element.value as unknown as T[keyof T];
      }
    });

    Store.set('isLoading', true);

    try {
      await this.handleSubmit(formValues);
    } catch (err) {
      this.updateError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      Store.set('isLoading', false);
    }

  }
}
