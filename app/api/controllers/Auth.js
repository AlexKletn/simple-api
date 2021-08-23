import { readFile } from 'fs/promises';
import User from '../../models/User';

export default {
  async singIn(ctx) {
    if (ctx.state.auth) ctx.throw(403);

    const {
      body,
    } = ctx.request;

    const user = await User.findOne({
      email: body.email,
    });

    if (!user) ctx.throw(404);

    const token = await user.login(body.password);

    if (token) ctx.body = { token };
    else ctx.throw(404);
  },
  async create(ctx) {
    if (ctx.state.auth) ctx.throw(403);

    const {
      body, files,
    } = ctx.request;

    const user = await User.create({
      email: body.email,
      name: body.name,
      image: await readFile(files.image.path),
      password: body.password,
    });

    if (!user) ctx.throw(401);

    ctx.body = {
      access_token: await user.login(body.password),
      expires_in: 3600,
      token_type: 'bearer',
    };
  },
};
