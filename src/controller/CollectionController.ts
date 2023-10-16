import { Request, Response } from "express";
import { CreateCollectionDto } from "pakt-sdk";
import { createCollection, fetchCollections } from "../services/collection";
import Utils from "../utils/response";

const { success, failed } = Utils;

const CollectionController = {
  create: async (req: Request, res: Response) => {
    const { name, description, isPrivate, deliveryDate, meta, type } = req.body;
    const payload: CreateCollectionDto = {
      name,
      type,
      description,
      deliveryDate,
      isPrivate,
      meta,
    };
    const resp = await createCollection({ payload });
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  createMany: async (req: Request, res: Response) => {},
  getAll: async (req: Request, res: Response) => {
    console.log({ filter: { ...req.query } });
    const resp = await fetchCollections({ filter: { ...req.query } });
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  getACollection: async (req: Request, res: Response) => {},
  update: async (req: Request, res: Response) => {},
  updateMany: async (req: Request, res: Response) => {},
  delete: async (req: Request, res: Response) => {},
};
export default CollectionController;
