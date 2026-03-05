import { BlockProps } from '../../../../../../shared/block';

export type ChatProps = BlockProps & {
  chatId?: number;
};

export type ChatWSMessage = {
  id: number;
  user_id: number;
  chat_id: number;
  type: string;
  time: string;
  content: string;
  is_read: boolean;
  file: unknown | null;
};
