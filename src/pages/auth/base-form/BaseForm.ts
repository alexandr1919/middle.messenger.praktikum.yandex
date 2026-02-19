import { Block } from '../../../shared/block';
import { TextInput } from '../../../shared/ui/components/text-input';

import { BaseFormProps } from './BaseForm.types';
import './base-form.css';

export abstract class BaseForm extends Block {
  formValues: string[] = [];
  inputs: Record<string, TextInput> = {};
  constructor(props: BaseFormProps) {
    const inputs = Object.entries(props.children || {}).reduce<Record<string, TextInput>>((acc, [key, value]) => {
      if (value instanceof TextInput) acc[key] = value;
      return acc;
    }, {});

    super('form', {
      ...props,
      attributes: { class: props.class || 'modal' },
      onSubmit: (event: Event) => {
        event.preventDefault();
        let isValid = true;
        Object.values(inputs).forEach((textInput) => {
          const inputElement = document.getElementsByName(textInput.name)[0] as HTMLElement;
          const inputElementValue = (inputElement as HTMLInputElement).value;
          const { term, required } = textInput.validators?.onSubmit || {};
          if (term) {
            const isInputValid = term.test(inputElementValue);
            inputElement.classList.toggle('text-input--error', !isInputValid);
            if (!isInputValid) isValid = false;
          }
          if (required) {
            inputElement.classList.toggle('text-input--error', !inputElementValue);
            if (!inputElementValue) isValid = false;
          }
        });
        if (!isValid) return;
        this.onSubmit();
      }
    });

    this.inputs = inputs;
  }

  onSubmit() {
    const formValues: Record<string, string> = {};
    this.formValues.forEach((name: string) => {
      const element = document.getElementsByName(name)[0] as HTMLInputElement;
      if (element) {
        formValues[name] = element.value;
      }
    });
    console.log('submitted: ', formValues);
  }
}
