import jwt from 'jsonwebtoken';
import { jwtRSA } from '../../configs';
import User from '../../app/models/User';

export default async function AuthMiddleware(ctx, next) {
  const { token } = ctx.request;

  if (token) {
    const payload = jwt.verify(token, jwtRSA.public);

    ctx.state.auth = User.findOne({
      _id: payload.id,
    }, {
      passwordHash: 0,
      tokens: 0,
      salt: 0,
    });
  } else {
    ctx.state.auth = null;
  }

  await next();
}
