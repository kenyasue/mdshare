import { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import utils from "../util/util";
import Debug from "debug";
const debug = Debug("route");

/**
 * @swagger
 * /api/document:
 *  post:
 *     summary: Adds a document
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               markdown:
 *                 type: string
 *               folderId:
 *                 type: integer
 *             example:   # Sample object
 *               markdown: "test"
 *               folderId: 0
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Document'
 *       '400':
 *         description: Wrong paramter
 */
export const post = async (req: Request, res: Response, next: NextFunction) => {
  const markdown: string = req.body.markdown;
  const folderId: number = req.body.folderId;

  if (utils.isEmpty(markdown))
    return res.status(400).send("markdown is required");

  try {
    const newDocument = await prisma.document.create({
      data: {
        markdown: markdown,
      },
    });

    res.send(newDocument);
  } catch (e) {
    next(e);
  }
};

/**
 * @swagger
 * /api/document/{id}:
 *  put:
 *     summary: Edit a document
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               markdown:
 *                 type: string
 *               folderId:
 *                 type: integer
 *             example:   # Sample object
 *               markdown: "test"
 *               folderId: 0
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Document'
 *       '400':
 *         description: Wrong paramter
 */
export const put = async (req: Request, res: Response, next: NextFunction) => {
  const documentId: number = parseInt(req.params.id);

  const markdown: string = req.body.markdown;
  const folderId: number = req.body.folderId;

  if (utils.isEmptyNumber(documentId))
    return res.status(400).send("ID is required");

  if (!documentId) return res.status(400).send("ID should be a number");

  if (utils.isEmpty(markdown))
    return res.status(400).send("markdown is required");

  try {
    // check existance
    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
      },
    });

    if (document === null) return res.status(400).send("Invalid ID");

    const updatedDocument = await prisma.document.update({
      where: { id: documentId },
      data: {
        markdown: markdown,
      },
    });

    res.send(updatedDocument);
  } catch (e) {
    next(e);
  }
};

/**
 * @swagger
 * /api/document:
 *  get:
 *     summary: Get all documents
 *     providers:
 *       "application/json"
 *     responses:
 *      '200':
 *        description: A list of Documents
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Document'
 */
export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allDocuments = await prisma.document.findMany();

    res.send(allDocuments);
  } catch (e) {
    next(e);
  }
};

/**
 * @swagger
 * /api/document/{id}:
 *  delete:
 *     summary: Delete a document
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       '200':
 *         description: OK
 *       '400':
 *         description: Wrong paramter
 */
export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const documentId: number = parseInt(req.params.id);

  if (utils.isEmptyNumber(documentId))
    return res.status(400).send("ID is required");

  if (!documentId) return res.status(400).send("ID should be a number");

  try {
    // check existance
    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
      },
    });

    if (document === null) return res.status(400).send("Invalid ID");

    const deleteCount = await prisma.document.delete({
      where: { id: documentId },
    });

    res.send("OK");
  } catch (e) {
    next(e);
  }
};
