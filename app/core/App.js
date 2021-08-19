import ObscurServer from '../../modules/Server';
import Router from '../../modules/Server/extras/Router';
import apiRoutes from '../api/routes';
// import { DB } from '../../modules/Storage';
import { apiServerConfig } from '../../configs';

export const apiServer = new ObscurServer(apiServerConfig);

const apiRouter = new Router(apiRoutes);

apiServer
  .use(apiRouter.routes())
  .use(apiRouter.allowedMethods());

export default {
  apiServer,
};
