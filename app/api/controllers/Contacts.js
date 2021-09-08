import Contact from '../../models/Contact';

export default {
  async get(ctx) {
    if (!ctx.state.auth) ctx.throw(403);

    if (ctx.request.params.id) {
      try {
        const item = await Contact.findById(ctx.request.params.id, { image: 0 });
        if (item) ctx.body = item;
        else ctx.throw(404);
      } catch (e) {
        ctx.throw(404);
      }
    } else {
      const {
        offset = 0,
        limit = 10,
        sortBy = 'name',
        sortDir = 'asc',
        search = '',
      } = ctx.request.query;

      const searchRegExp = new RegExp(`${search}`, 'i');

      const filter = {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { emails: { $in: [searchRegExp] } },
          { phones: { $in: [searchRegExp] } },
        ],
      };

      ctx.body = {
        meta: {
          offset,
          limit,
          sortBy,
          sortDir,
          search,
          total: await Contact.countDocuments(filter),
        },
        items: await Contact.find(filter).sort({
          [sortBy]: sortDir,
        })
          .skip(Math.abs(Number(offset)))
          .limit(Math.abs(Number(limit))),
      };
    }
  },
  async contactImg(ctx) {
    if (ctx.request.params.id) {
      try {
        const { image } = await Contact.findById(ctx.request.params.id, { image: 1 });

        if (image) {
          ctx.type = image.type;
          ctx.body = image.data;
        } else ctx.throw(404);
      } catch (e) {
        ctx.throw(404);
      }
    } else ctx.throw(404);
  },
  async create(ctx) {
    if (!ctx.state.auth) ctx.throw(403);

    const {
      body,
    } = ctx.request;

    ctx.body = await Contact.create({
      name: body.name,
      bio: body.bio,
      role: body.role,
      phones: body.phones.map((phone) => String(phone)),
      emails: body.emails,
    }).catch((e) => {
      ctx.throw(422, e);
    });
  },
  async update(ctx) {
    if (!ctx.state.auth) ctx.throw(403);

    const {
      body, params,
    } = ctx.request;

    if (!params.id) ctx.throw(404);

    ctx.body = await Contact.findOneAndUpdate({
      _id: params.id,
    }, body, {
      new: true,
    });
  },
  async delete(ctx) {
    if (!ctx.state.auth) ctx.throw(403);

    const {
      params,
    } = ctx.request;

    if (!params.id) ctx.throw(404);

    try {
      await Contact.findOneAndRemove({
        _id: params.id,
      });
    } catch (e) {
      ctx.throw();
    }

    ctx.body = {
      result: 'ok',
    };
  },
};
