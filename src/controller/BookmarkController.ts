import { Request, Response } from "express";
import {
  createBookmark,
  deleteABookmark,
  fetchABookMark,
  fetchBookmarks,
} from "../services/bookmark";
import Utils from "../utils/response";

const { success, failed } = Utils;

const BookmarkController = {
  create: async (req: Request, res: Response) => {
    const { reference, type } = req.body;
    const resp = await createBookmark({
      payload: {
        reference,
        type,
      },
    });

    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  getAll: async (req: Request, res: Response) => {
    const filter = { ...req.query };
    const resp = await fetchBookmarks(filter);
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  getById: async (req: Request, res: Response) => {
    const id = req.params.id;
    const resp = await fetchABookMark(id);
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  deleteBookmark: async (req: Request, res: Response) => {
    const id = req.params.id;
    const resp = await deleteABookmark(id);
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
};
export default BookmarkController;
