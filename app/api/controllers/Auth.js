import { readFile } from 'fs/promises';
import User from '../../models/User';

export default {
  async singIn(ctx) {
    if (ctx.state.auth) ctx.throw(403, 'access forbidden');

    const {
      body,
    } = ctx.request;

    const user = await User.findOne({
      email: body.email,
    });

    const token = await user.login(body.password);

    if (token) ctx.body = { token };
    else ctx.throw(401);
  },
  async create(ctx) {
    if (ctx.state.auth) ctx.throw(403, 'access forbidden');

    const {
      body, files,
    } = ctx.request;

    const user = await User.create({
      email: body.email,
      name: body.name,
      image: await readFile(files.image.path),
      password: body.password,
    });

    console.log(body, user);

    ctx.body = {
      token: await user.login(body.password),
    };
  },
};
