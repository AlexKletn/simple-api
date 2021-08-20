import { Auth } from './controllers';

export default {
  '/': {
    name: 'home',

    user: {
      name: 'user',

      create: {
        post: Auth.create,
      },
      'sing-in': {
        post: Auth.singIn,
      },
    },

    contacts: {
      name: 'contacts-catalog',

      get: () => {
      },
      post: () => {
      },
      put: () => {
      },
      delete: () => {
      },
    },
  },
};
