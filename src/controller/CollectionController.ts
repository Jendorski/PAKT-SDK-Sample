import { Request, Response } from "express";
import { CreateCollectionDto } from "pakt-sdk";
import {
  createCollection,
  deleteCollection,
  fetchACollection,
  fetchCollections,
  updateCollection,
} from "../services/collection";
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
  getACollection: async (req: Request, res: Response) => {
    const id = req.params.id;
    const resp = await fetchACollection(id);
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  update: async (req: Request, res: Response) => {
    const id = req.params.id;
    const {
      name,
      description,
      isPrivate,
      deliveryDate,
      meta,
      type,
      attachments,
    } = req.body;
    const payload = {
      name,
      description,
      isPrivate,
      deliveryDate,
      meta,
      type,
      attachments,
    };
    const resp = await updateCollection(id, payload);
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  updateMany: async (req: Request, res: Response) => {},
  delete: async (req: Request, res: Response) => {
    const id = req.params.id;
    const resp = await deleteCollection(id);
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
};
export default CollectionController;
