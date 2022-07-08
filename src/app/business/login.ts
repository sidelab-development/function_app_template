import { NotFoundException } from 'sidelab-http-exceptions';
import { USER_EXCEPTIONS_MESSAGES } from '../exceptions/user';
import { IGenericObject } from '../interfaces/generic-object';
import {
  IRefreshTokenResponse, ITokenPayload, IUserLogged, IValidateTokenResponse
} from '../interfaces/token';
import { ITokenProvider } from '../providers/token/interface';
import { IUserRepository } from '../repositories/user/interface';

export class LoginBusiness {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenProvider: ITokenProvider
  ) {}

  /**
   * Generates an access token for the specified user
   * @param data User data
   * @returns Token Pair and User Id
   */
  async login(data: IGenericObject): Promise<IUserLogged> {
    const user = await this.userRepository.findActiveByEmail(data.email);
    if (!user) throw new NotFoundException(USER_EXCEPTIONS_MESSAGES.NOT_FOUND);

    const { id, name, email } = user;

    const payload = this.buildPayload(id);
    const { token, refresh_token } = this.tokenProvider.generateTokenPair(payload);

    return {
      token,
      refresh_token,
      user: {
        id, name, email,
      },
    };
  }

  /**
   * Generate new access token by the provided refresh token
   * @param refreshToken string
   * @returns New access token
   */
  refreshToken(refreshToken: string): IRefreshTokenResponse {
    const { user_id } = this.tokenProvider.verifyToken(refreshToken) as ITokenPayload;
    const payload = this.buildPayload(user_id);

    const token = this.tokenProvider.generateAccessToken(payload);

    return { token };
  }

  /**
   * Verify token and return if it is valid
   * @param token string
   * @returns Object that contains field 'valid' that indicates if token is valid or not
   */
  validateToken(token: string): IValidateTokenResponse {
    try {
      this.tokenProvider.verifyToken(token);
      return { valid: true };
    } catch (error) {
      return { valid: false };
    }
  }

  /**
   * Creates an payload object with user information.
   * @param user_id string
   * @returns Payload object
   */
  buildPayload(user_id: string): ITokenPayload {
    const payload = {
      user_id,
    } as ITokenPayload;

    return payload;
  }
}
