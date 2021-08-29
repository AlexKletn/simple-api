import { Auth, Contact } from './controllers';

export default {
  '/': {
    'sing-up': {
      post: Auth.create,
    },
    'sing-in': {
      post: Auth.signIn,
    },
    'sign-in': {
      post: Auth.signIn,
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
