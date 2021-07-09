import Koa from 'koa';
import sslify from 'koa-sslify';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import http from 'http';
import https from 'https';
import { readFileSync } from 'fs';

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

    this.use(bodyParser());
    this.use(logger());

    this.httpServer = http.createServer(this.callback());
    this.httpServer.listen(port, host);
  }
}
