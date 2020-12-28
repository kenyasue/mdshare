import { Response, Request, NextFunction } from "express";

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
  res.send("OK");
};
