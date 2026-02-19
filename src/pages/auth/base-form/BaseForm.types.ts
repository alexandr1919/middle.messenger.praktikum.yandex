import { Block, BlockProps } from '../../../shared/block';

export type BaseFormChildren = Record<string, Block | string>;

export type BaseFormProps = Omit<BlockProps, 'children'> & {
  class?: string;
  children?: BaseFormChildren;
};
