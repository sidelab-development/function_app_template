export type IUserLogged = {
  token: string;
  refresh_token: string;
  user: {
    id: string;
    name: string;
    email: string;
  }
}

export interface ITokenPayload {
  user_id: string;
}

export type IRefreshTokenResponse = {
  token: string;
}

export type IValidateTokenResponse = {
  valid: boolean;
}
