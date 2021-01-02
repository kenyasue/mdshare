import { Response, Request, NextFunction } from "express";

import config from "../config";
import { server } from "../server";

/**
 * @swagger
 * /:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 */
export const index = (req: Request, res: Response, next: NextFunction) => {
  return server.nextApp.render(req, res, "/");
};
