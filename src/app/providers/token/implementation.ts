import jwt from 'jsonwebtoken';
import { NotAuthorizedException } from 'sidelab-http-exceptions';
import VARIABLES from '../../configuration/variables';
import { IGenericObject } from '../../interfaces/generic-object';
import { ITokenProvider } from './interface';

interface IPairTokens {
  token: string;
  refresh_token: string
}

class TokenProvider implements ITokenProvider {
  private readonly TOKEN_SECONDS_EXPIRATION = 60 * 60; // 1 hour = 3600 seconds

  private readonly REFRESH_TOKEN_SECONDS_EXPIRATION = 60 * 60 * 24 * 365; // 1 year = 31536000 seconds

  /**
   * Generates a JWT Token
   * @param payload Data to be stored in token
   * @param expirationInSeconds Time to expire token. Default: 1 hour
   * @returns JWT Token
   */
  generateToken = (payload: IGenericObject, expirationInSeconds = 3600): string => {
    const token = jwt.sign({ ...payload, exp: Math.floor(Date.now() / 1000) + expirationInSeconds }, VARIABLES.SECRET_KEY);
    return token;
  };

  /**
   * Generates a access token with 1 hour expiration
   * @param payload Data to be stored in the token
   * @returns JWT Token
   */
  generateAccessToken = (payload: IGenericObject): string => this.generateToken(payload, this.TOKEN_SECONDS_EXPIRATION);

  /**
   * Generates a refresh token with 1 day expiration
   * @param payload Data to be stored in the token
   * @returns JWT Token
   */
  generateRefreshToken = (payload: IGenericObject): string => this.generateToken(payload, this.REFRESH_TOKEN_SECONDS_EXPIRATION);

  /**
   * Generate a pair of tokens (1 access token and 1 refresh token).
   * @param payload Data to be stored in tokens
   * @returns JWT Token
   */
  generateTokenPair = (payload: IGenericObject): IPairTokens => {
    const token = this.generateAccessToken(payload);
    const refresh_token = this.generateRefreshToken(payload);
    return {
      token,
      refresh_token,
    };
  };

  /**
   * Checks if the provided token is valid
   * @param token Token to verify
   * @returns Decoded payload
   */
  verifyToken = (token: string): string | jwt.JwtPayload => {
    try {
      return jwt.verify(token, VARIABLES.SECRET_KEY);
    } catch (err) {
      throw new NotAuthorizedException(err.message);
    }
  };
}

export { TokenProvider };
