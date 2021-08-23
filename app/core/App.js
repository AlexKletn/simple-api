import swagger from 'swagger2';
import swaggerKoa from 'swagger2-koa';
import { resolve } from 'path';
import ObscurServer from '../../modules/Server';
import Router from '../../modules/Server/extras/Router';
import apiRoutes from '../api/routes';
import { DB } from '../../modules/Storage';
import { apiServerConfig, storageConfig } from '../../configs';

const swaggerDoc = swagger.loadDocumentSync(resolve('app/api/api.yaml'));

export const apiServer = new ObscurServer(apiServerConfig);

const apiRouter = new Router(apiRoutes);

apiServer
  .use(swaggerKoa.ui(swaggerDoc, '/swagger'));

apiServer
  .use(apiRouter.routes())
  .use(apiRouter.allowedMethods());

DB(storageConfig.mongo);

export default {
  apiServer,
};
