import { Request, Response } from "express";
import { CreateCollectionDto } from "pakt-sdk";
import {
  createCollection,
  deleteCollection,
  fetchACollection,
  fetchCollections,
  updateCollection,
} from "../services/collection";
import { removeString } from "../utils/helper";
import Utils from "../utils/response";

const { success, failed } = Utils;

const CollectionController = {
  create: async (req: Request, res: Response) => {
    const {
      name,
      description,
      isPrivate,
      deliveryDate,
      meta,
      type,
      category,
      tags,
    } = req.body;
    const auth = removeString(String(req.headers.authorization), "Bearer ");
    const payload: CreateCollectionDto = {
      name,
      type,
      description,
      deliveryDate,
      isPrivate,
      meta,
      category,
      tags,
    };
    const resp = await createCollection({ authToken: String(auth), payload });
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  createMany: async (req: Request, res: Response) => {},
  getAll: async (req: Request, res: Response) => {
    console.log({ filter: { ...req.query } });
    const auth = removeString(String(req.headers.authorization), "Bearer ");
    const resp = await fetchCollections({
      filter: { ...req.query },
      authToken: String(auth),
    });
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  getACollection: async (req: Request, res: Response) => {
    const id = req.params.id;
    const auth = removeString(String(req.headers.authorization), "Bearer ");
    const resp = await fetchACollection(String(auth), id);
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  update: async (req: Request, res: Response) => {
    const id = req.params.id;
    const auth = removeString(String(req.headers.authorization), "Bearer ");
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
    const resp = await updateCollection(id, payload, String(auth));
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  updateMany: async (req: Request, res: Response) => {},
  deleteACollection: async (req: Request, res: Response) => {
    const id = req.params.id;
    const auth = removeString(String(req.headers.authorization), "Bearer ");
    const resp = await deleteCollection(id, String(auth));
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
};
export default CollectionController;
