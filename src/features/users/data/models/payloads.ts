export interface UpdateUserMePayload {
  username: string;
  email: string;
}

export interface ChangePasswordUserMePayload {
  current: string;
  new: string;
  confirm: string;
}

export type ResetPasswordEmailPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  password: string;
  token: string;
};

export type BlackListTokenPayload = {
  token: string;
};

export type DecodeTokenPayload = {
  token: string;
};
export type ValidateTokenPayload = {
  token: string;
};

export type ChangeUserPasswordPayload = {
  password: string;
};
