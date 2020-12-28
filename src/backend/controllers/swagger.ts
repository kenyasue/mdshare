import { Response, Request, NextFunction } from "express";

/**
 * @swagger
 *
 * definitions:
 *   Document:
 *     markdown: string
 *     folderId: number
 *     modifiedAt: string
 *     createAt: string
 */

/**
 * @swagger
 *
 * components:
 *   schemas:
 *     Document:
 *       type: object
 *       required:
 *         - markdown
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the document.
 *         markdown:
 *           type: string
 *           description: The markdown of the document
 *         folderId:
 *           type: number
 *         modifiedAt:
 *            type: string
 *            format: datetime
 *         createAt:
 *           type: string
 *           format: datetime
 */

export const get = async (req: Request, res: Response, next: NextFunction) => {
  res.send("OK");
};
