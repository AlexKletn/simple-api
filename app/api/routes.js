import { Auth, HomeController } from './controllers';

export default {
  '/': {
    name: 'home',

    test: {
      get: HomeController,
    },
    auth: {
      name: 'auth',

      login: {
        post: Auth.login,
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
