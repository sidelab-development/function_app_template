import { HttpRequestHeaders } from '@azure/functions';
import { NotAuthorizedException } from 'sidelab-http-exceptions';
import { TOKEN_EXCEPTIONS_MESSAGES } from '../../exceptions/token';

/**
 * Split the string on format 'Bearer \<token\>' and return only the token
 * @param tokenWithBearer string
 * @returns string
 */
const getTokenString = (tokenWithBearer: string): string => {
  if (!tokenWithBearer) throw new NotAuthorizedException(TOKEN_EXCEPTIONS_MESSAGES.NOT_PROVIDED);

  const [bearerPart, tokenPart] = tokenWithBearer.split(' ');

  if (bearerPart !== 'Bearer') throw new NotAuthorizedException(TOKEN_EXCEPTIONS_MESSAGES.MUST_BE_BEARER_FORMAT);
  if (!tokenPart) throw new NotAuthorizedException(TOKEN_EXCEPTIONS_MESSAGES.NOT_PROVIDED);

  return tokenPart;
};

/**
 * Extract access token from header
 */
export const extractAccessTokenFromHeaders = (headers: HttpRequestHeaders): string => {
  const { authorization } = headers;
  const token = getTokenString(authorization);
  return token;
};

/**
 * Extract refresh token from header
 */
export const extractRefreshTokenFromHeaders = (headers: HttpRequestHeaders): string => {
  const { refresh_token } = headers;
  const token = getTokenString(refresh_token);
  return token;
};
