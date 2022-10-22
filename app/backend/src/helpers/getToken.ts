import { sign, SignOptions } from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const secret = process.env.JWT_SECRET || 'jwt_secret';

const jwtConfig: SignOptions = {
  expiresIn: '5d',
  algorithm: 'HS256',
};

export default function getToken(email: string, id: number) {
  const token = sign({ data: { email, id } }, secret, jwtConfig);
  return token;
}
