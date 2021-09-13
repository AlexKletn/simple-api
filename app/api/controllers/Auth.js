import User from '../../models/User';

export default {
  async signIn(ctx) {
    if (ctx.state.auth) ctx.throw(403);

    const {
      body,
    } = ctx.request;

    const user = await User.findOne({
      email: body.email,
    });

    if (!user) ctx.throw(401);

    const token = await user.login(body.password);

    if (token) {
      ctx.body = {
        access_token: token,
        expires_in: 3600,
        token_type: 'bearer',
      };
    } else ctx.throw(401);
  },
  async create(ctx) {
    if (ctx.state.auth) ctx.throw(403);

    const {
      body, /* files, */
    } = ctx.request;

    const user = await User.create({
      email: body.email,
      name: body.name,
      // image: await readFile(files.image.path),
      password: body.password,
    });

    if (!user) ctx.throw(401);

    ctx.body = {
      access_token: await user.login(body.password),
      expires_in: 3600,
      token_type: 'bearer',
    };
  },
  async me(ctx) {
    if (ctx.request.params.id) {
      try {
        const item = await User.findById(ctx.request.params.id, { image: 0 });
        if (item) ctx.body = item;
        else ctx.throw(404);
      } catch (e) {
        ctx.throw(404);
      }
    }
  },
  async userImg(ctx) {
    if (ctx.request.params.id) {
      try {
        const { image } = await User.findById(ctx.request.params.id, { image: 1 });

        if (image) {
          ctx.type = image.type;
          ctx.body = image.data;
        } else ctx.throw(404);
      } catch (e) {
        ctx.throw(404);
      }
    } else ctx.throw(404);
  },
};
