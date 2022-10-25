import { sign, SignOptions } from 'jsonwebtoken';
import { SECRET } from './constants';

const jwtConfig: SignOptions = {
  expiresIn: '15d',
  algorithm: 'HS256',
};

export function getToken(email: string, id: number) {
  const token = sign({ data: { email, id } }, SECRET, jwtConfig);
  return token;
}

export function convertToBoolean(string: string): boolean {
  if (string === 'true') return true;
  return false;
}
