import { readFileSync } from 'fs';
import { resolve } from 'path';

export default {
  tokenCookieName: 'token',
};

export const jwtRSA = {
  public: readFileSync(resolve('secure/jwt/obscur.pem')),
  private: readFileSync(resolve('secure/jwt/obscur.key')),
};
