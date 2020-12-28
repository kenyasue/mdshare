import express = require("express");
import { Response, Request, NextFunction } from "express";
import bodyParser from "body-parser";
import Debug from "debug";
import path from "path";

import * as RouteTest from "./controllers/test";
import * as RouteDocument from "./controllers/document";

// API Documentation
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const debug = Debug("http");

export interface ServerConfig {
  port: number;
}

export class Server {
  port: Number;
  app: express.Application;

  constructor({ port }: ServerConfig) {
    this.port = port;
    this.app = express();

    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());

    this.urlMap();
  }

  urlMap(): void {
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

  listen(): void {
    this.app.listen(this.port, () => {
      debug(`App is listening on port ${this.port} !`);
    });
  }
}
