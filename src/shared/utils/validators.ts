import { EventKey } from '../block/Block.types';

export type Validators =
  | Record<EventKey, { term?: RegExp; required?: boolean; minLength?: number; maxLength?: number }>
  | undefined;

export const validateName: Record<string, RegExp> = { term: /^[A-Za-z-]+$/ };
export const nameValidators: Validators = { onBlur: validateName, onSubmit: validateName };
export const validateLogin: Record<string, RegExp> = {
  term: /^(?=.*[A-Za-z])[A-Za-z0-9_-]{3,20}$/
};
export const loginValidators: Validators = { onBlur: validateLogin, onSubmit: validateLogin };
export const validateEmail: Record<string, RegExp> = { term: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ };
export const emailValidators: Validators = { onBlur: validateEmail, onSubmit: validateEmail };
export const validatePassword = { term: /^(?=.*[A-Z])(?=.*[0-9]).{8,40}$/ };
export const passwordValidators: Validators = { onBlur: validatePassword, onSubmit: validatePassword };
export const validatePhone = { term: /^\+?[0-9]{10,15}$/ };
export const phoneValidators: Validators = { onBlur: validatePhone, onSubmit: validatePhone };

export const loginFormValidators: Validators = { onSubmit: { required: true } };
