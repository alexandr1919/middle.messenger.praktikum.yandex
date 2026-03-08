import { UserModel } from '../../../../../shared/user/User.types';

type LastMessageUser = Omit<UserModel, 'id' | 'display_name'>;

type LastMessage = {
  user: LastMessageUser;
  time: string;
  content: string;
};

export type ChatModel = {
  id: number;
  title: string;
  avatar: string | null;
  unread_count: number;
  created_by: number;
  last_message: LastMessage | null;
};
