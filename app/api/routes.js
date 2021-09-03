import { Auth, Contact, Messages } from './controllers';

export default {
  '/': {
    'sign-up': {
      post: Auth.create,
    },
    'sign-in': {
      post: Auth.signIn,
    },

    user: {
      name: 'User',

      get: Auth.me,

      '/image': {
        get: Auth.userImg,
      },
    },

    contacts: {
      name: 'contacts',

      post: Contact.create,

      get: Contact.get,

      '/:id': {
        get: Contact.get,
        put: Contact.update,
        del: Contact.delete,

        '/image': {
          get: Contact.contactImg,
        },
      },
    },
    messages: {
      name: 'messages',

      post: Messages.create,
    },
  },
};
