import { BlockProps } from '../../../block/Block.types';

export type ButtonProps = BlockProps & {
  text?: string;
  type?: string;
  className?: string;
};
