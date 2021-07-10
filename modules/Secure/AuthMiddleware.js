import jwt from 'jsonwebtoken';
import secureConfig from '../../configs/secure';
import { DB } from '../Storage';

export default async function AuthMiddleware({}, next) {
  next();
}
