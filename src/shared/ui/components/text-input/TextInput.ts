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
  constructor(props: TextInputProps) {
    const { name, placeholder, type, validators, value } = props;

    const events: Record<string, EventListener> = {};
    if (validators) {
      Object.entries(validators).forEach(([event, rules]) => {
        events[event] = (e: Event) => {
          const target = e.target as HTMLElement;
          Object.entries(rules).forEach(([condition, value]) => {
            if (!validate(name, condition, value)) {
              target.classList.add('text-input--error');
            } else {
              target.classList.remove('text-input--error');
            }
          });
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
  }

  render() {
    return this.compile(TextInputTemplate, this.props);
  }
}
