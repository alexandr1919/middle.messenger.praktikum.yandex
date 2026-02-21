import { WithEvents } from '../../../block/Block.types';
import { Validators } from '../../../utils/validators';

export type TextInputProps = {
  name: string;
  placeholder: string;
  type?: string;
  value?: string;
  validators?: Validators;
  errorMessage?: string;
} & WithEvents;
