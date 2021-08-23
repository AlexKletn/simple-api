import Contact from '../../models/Contact';

export default {
  async get(ctx) {
    if (!ctx.state.auth) ctx.throw(403);

    if (ctx.id) {
      ctx.body = await Contact.findById(ctx.id);
    } else {
      const {
        page = 1,
        perPage = 10,
        sortBy = 'name',
        sortDir = 'asc',
        search = '',
      } = ctx.request.query;

      const searchRegExp = new RegExp(`${search}`, 'i');

      ctx.body = await Contact.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { emails: { $in: [searchRegExp] } },
          { phones: { $in: [searchRegExp] } },
        ],
      }).sort({
        [sortBy]: sortDir,
      }).skip((page - 1) * perPage).limit(perPage);
    }
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
    }, body);
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
