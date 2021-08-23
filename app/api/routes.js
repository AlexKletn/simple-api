import KoaStatic from 'koa-static';
import { Auth, Contact } from './controllers';

export default {
  '/': {
    'sing-up': {
      post: Auth.create,
    },
    'sing-in': {
      post: Auth.singIn,
    },

    contacts: {
      name: 'contacts',

      post: Contact.create,

      get: Contact.get,
      '/:id': {
        get: Contact.get,
        put: Contact.update,
        del: Contact.delete,
      },
    },
  },
};
