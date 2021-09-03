import Message from '../../models/Message';

export default {
  async get(ctx) {
    if (!ctx.state.auth) ctx.throw(403);

    if (ctx.id) {
      ctx.body = await Message.findById(ctx.id).populate('contact');
    } else {
      const {
        page = 1,
        perPage = 10,
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
          page,
          perPage,
          sortBy,
          sortDir,
          search,
          total: await Message.countDocuments(filter),
        },
        items: await Message.find(filter).populate('contact').sort({
          [sortBy]: sortDir,
        }).skip((page - 1) * perPage)
          .limit(perPage),
      };
    }
  },
  async create(ctx) {
    if (!ctx.state.auth) ctx.throw(403);

    const {
      body,
    } = ctx.request;

    ctx.body = await Message.create({
      contact: body.contactID,
      message: body.message,
    }).catch((e) => {
      ctx.throw(422, e);
    });
  },
};
