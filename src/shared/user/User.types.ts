export type UserModel = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string | null;
  avatar: string | null;
  phone: string;
  email: string;
};

export type UpdateProfilePayload = Omit<UserModel, 'id' | 'avatar'>;

export type UpdatePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};
