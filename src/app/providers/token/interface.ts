import jwt from 'jsonwebtoken';
import { IGenericObject } from '../../interfaces/generic-object';

interface IPairTokens {
  token: string;
  refresh_token: string
}

export interface ITokenProvider {
  generateToken(payload: IGenericObject, expirationInSeconds?: number): string;
  generateAccessToken(payload: IGenericObject): string;
  generateRefreshToken(payload: IGenericObject): string;
  generateTokenPair (payload: IGenericObject): IPairTokens;
  verifyToken(token: string): string | jwt.JwtPayload;
}
