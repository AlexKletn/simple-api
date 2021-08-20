import Koa from 'koa';
import sslify from 'koa-sslify';
import koaBody from 'koa-body';
import bearerToken from 'koa-bearer-token';
import logger from 'koa-logger';
import http from 'http';
import https from 'https';
import { readFileSync } from 'fs';
import AuthMiddleware from '../../Secure/AuthMiddleware';

export default class ObscurServer extends Koa {
  constructor({ host = 'localhost', port = 8080, secureConfig }) {
    super();

    if (secureConfig) {
      const {
        securePort,
        keyPath,
        certPath,
      } = secureConfig;
      this.use(sslify({
        securePort,
        key: readFileSync(keyPath),
        cert: readFileSync(certPath),
      }));

      this.httpsServer = https.createServer({

      }, this.callback());
      this.httpsServer.listen(securePort, host);
    }

    this.use(koaBody({
      multipart: true,
      uploadDir: '/tmp',
      formidable: {
        formLimit: '2mb',
        maxFileSize: 200 * 1024 * 1024, // Upload file size
        keepExtensions: true, //  Extensions to save images
      },
    }));
    this.use(bearerToken());
    this.use(AuthMiddleware);
    this.use(logger());

    this.httpServer = http.createServer(this.callback());
    this.httpServer.listen(port, host);
  }
}
