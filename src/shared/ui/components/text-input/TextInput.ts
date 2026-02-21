import { Block } from '../../../block';
import { Validators } from '../../../utils/validators';

import { TextInputTemplate } from './TextInput.tmpl';
import { TextInputProps } from './TextInput.utils';
import './text-input.css';

const validate = (name: string, condition: string, validationValue: RegExp | boolean | number) => {
  if (condition === 'term' && validationValue instanceof RegExp) {
    const inputValue = (document.getElementsByName(name)[0] as HTMLInputElement).value;
    return !inputValue || validationValue.test(inputValue);
  }
};

export class TextInput extends Block {
  name: string;
  validators: Validators = {};
  errorMessage = '';
  constructor(props: TextInputProps) {
    const { name, placeholder, type, validators, value, errorMessage } = props;

    const events: Record<string, EventListener> = {};
    if (validators) {
      Object.entries(validators).forEach(([event, rules]) => {
        events[event] = (e: Event) => {
          const target = e.target as HTMLElement;
          const errorSpan = target.parentElement?.querySelector<HTMLElement>('.text-input__error');
          let isValid = true;

          Object.entries(rules).forEach(([condition, ruleValue]) => {
            if (!validate(name, condition, ruleValue)) {
              isValid = false;
            }
          });

          if (isValid) {
            target.classList.remove('text-input--error');
            if (errorSpan) errorSpan.textContent = '';
          } else {
            target.classList.add('text-input--error');
            if (errorSpan) errorSpan.textContent = errorMessage || 'Invalid value';
          }
        };
      });
    }
    super('div', {
      children: {
        input: new Block('input', {
          attributes: { name, placeholder, type: type || 'text', class: 'text-input', value: value || '' },
          ...events
        })
      }
    });
    this.validators = validators;
    this.name = name;
    this.errorMessage = errorMessage || 'Invalid value';
  }

  render() {
    return this.compile(TextInputTemplate, this.props);
  }
}
