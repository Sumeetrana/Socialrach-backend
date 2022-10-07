import express, { Express } from 'express';

import { config } from './config';
import databaseConnection from './setupDatabase';
import { SocialRackServer } from "./setupServer";

class Application {
  public initialize(): void {
    this.loadConfig();
    databaseConnection();
    const app: Express = express();
    const server: SocialRackServer = new SocialRackServer(app);
    server.start();
  }

  private loadConfig(): void {
    config.validateConfig();
  }
}

const application: Application = new Application();
application.initialize();