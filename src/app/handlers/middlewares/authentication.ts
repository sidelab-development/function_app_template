import { HttpRequestHeaders } from '@azure/functions';
import { ITokenPayload } from '../../interfaces/token';
import { TokenProvider } from '../../providers/token/implementation';
import { extractAccessTokenFromHeaders } from '../utils/extract-token-from-header';

/**
 * Decode token
 * @param token string
 * @returns ITokenPayload
 */
const decodeToken = (token: string): ITokenPayload => {
  const tokenProvider = new TokenProvider();
  const decoded = tokenProvider.verifyToken(token) as ITokenPayload;

  return decoded;
};

/**
 * Authenticate global role
 * @param headers HttpRequestHeaders
 * @returns ITokenPayload
 */
export const authenticateGlobal = async (headers: HttpRequestHeaders): Promise<ITokenPayload> => {
  const token = extractAccessTokenFromHeaders(headers);
  const decoded = decodeToken(token);

  return decoded;
};
