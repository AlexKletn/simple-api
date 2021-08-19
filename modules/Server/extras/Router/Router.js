import KoaRouter from '@koa/router';

export default class Router extends KoaRouter {
  constructor({ prefix = '', middlewares = [], ...routes }) {
    super({ prefix });

    // eslint-disable-next-line no-restricted-syntax
    for (const middleware of middlewares) {
      this.use(middleware);
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const routeKey of Object.keys(routes)) {
      const route = routes[routeKey];
      const {
        name,
        get,
        post,
        put,
        patch,
        del,
        redirect,
        ...subs
      } = route;
      const args = [];

      if (name) args.push(name);
      args.push(routeKey.replace(/^\/*?/, '/'));

      if (get) this.writeRoute('get', get, args);
      if (post) this.writeRoute('post', post, args);
      if (put) this.writeRoute('put', put, args);
      if (patch) this.writeRoute('patch', patch, args);
      if (del) this.writeRoute('del', del, args);

      if (Object.keys(subs).length > 0) {
        const router = new Router({
          prefix: routeKey,

          ...subs,
        });

        this
          .use(router.routes())
          .use(router.allowedMethods());
      }
    }
  }

  writeRoute(methodName, handler, args) {
    const methodArgs = args;

    if (handler instanceof Array) {
      methodArgs.push(...handler);
    } else {
      methodArgs.push(handler);
    }

    this[methodName](...methodArgs);
  }
}
