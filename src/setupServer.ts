import hpp from 'hpp';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookierSession from 'cookie-session';
import HTTP_STATUS from 'http-status-codes';
import { Application, json, urlencoded, Response, Request, NextFunction } from 'express';

import { config } from './config';

const SERVER_PORT = 5000;

export class SocialRackServer {
  private app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  public start(): void {
    this.securityMiddleware(this.app);
    this.standardMiddleware(this.app);
    this.routesMiddleware(this.app);
    this.globalErrorHandler(this.app);
    this.startServer(this.app);
  }

  private securityMiddleware(app: Application): void {
    app.use(
      cookierSession({
        name: 'socialrack-session',
        keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!],
        maxAge: 24 * 7 * 3600000,
        secure: config.NODE_ENV !== 'development'
      })
    )
    app.use(cors({
      origin: config.CLIENT_URL,
      credentials: true,
      optionsSuccessStatus: 200, // for older browsers
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    }));
    app.use(helmet());
    app.use(hpp());
  };

  private standardMiddleware(app: Application): void {
    app.use(compression());
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ limit: '50mb', extended: true }))
  };

  private routesMiddleware(app: Application): void { };

  private globalErrorHandler(app: Application): void { };

  private async startServer(app: Application): Promise<void> {
    try {
      const httpServer: http.Server = new http.Server(http);
      this.startHttpServer(httpServer);
    } catch (error) {
      console.log(error);
    }
  };

  private createSocketIO(httpServer: http.Server): void { };

  private startHttpServer(httpServer: http.Server): void {
    httpServer.listen(SERVER_PORT, () => {
      console.log(`Server running on port ${SERVER_PORT}`);

    })
  };

}