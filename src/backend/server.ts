import express = require("express");
import { Response, Request, NextFunction } from "express";
import bodyParser from "body-parser";
import Debug from "debug";
import path from "path";
import next from "next";

import * as RouteTest from "./controllers/test";
import * as RouteDocument from "./controllers/document";

import config from "./config";

// API Documentation
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const debug = Debug("http");

export interface ServerConfig {
  port: number;
}

class Server {
  port: Number;
  app: any;
  nextApp: any;
  handle: any;

  constructor() {
    // default port
    this.port = 3000;

    this.nextApp = next({
      dev: config.isDev,
      dir: path.resolve(__dirname, "../../src/frontend"),
    });

    this.handle = this.nextApp.getRequestHandler();

    this.app = null;
  }

  async init(): Promise<void> {
    await this.nextApp.prepare();

    this.app = express();
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    // API Documnetation

    // __dirname = "dist/backend" not "src/backend"
    const projectTopPath = path.resolve(__dirname, "../../");
    const options = {
      swaggerDefinition: {
        openapi: "3.0.1",
        info: {
          title: "DocuDocu",
          version: "1.0.0",
        },
        host: `localhost:${this.port}`, // Host (optional)
        basePath: "/", // Base path (optional)
      },
      apis: [projectTopPath + "/src/backend/controllers/*.ts"],
    };

    const swaggerSpecification = swaggerJsdoc(options);

    this.app.use(
      "/doc",
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpecification)
    );

    this.app.get("/", RouteTest.index);

    this.app.get("/api/document", RouteDocument.get);
    this.app.post("/api/document", RouteDocument.post);
    this.app.delete("/api/document/:id", RouteDocument.deleteOne);
    this.app.put("/api/document/:id", RouteDocument.put);

    this.app.get("*", (req: Response, res: Response) => {
      return this.handle(req, res);
    });

    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).json({
          message: "Server Error",
          err: err,
        });
      }
    );
  }

  listen(config: ServerConfig): void {
    this.port = config.port;

    this.app.listen(this.port, () => {
      debug(`App is listening on port ${this.port} !`);
    });
  }
}

// singletons
export const server = new Server();
