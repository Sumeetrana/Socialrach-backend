import express, { Express } from 'express';

import { SocialRackServer } from "./setupServer";

class Application {
  public initialize(): void {
    const app: Express = express();
    const server: SocialRackServer = new SocialRackServer(app);
    server.start();
  }
}

const application: Application = new Application();
application.initialize();