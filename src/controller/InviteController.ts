import { Request, Response } from "express";
import {
  acceptInvite,
  declineInvite,
  getAllInvites,
  getAnInvite,
  sendInvite,
} from "../services/invite";
import Utils from "../utils/response";

const { success, failed } = Utils;

const InviteController = {
  sendInvite: async (req: Request, res: Response) => {
    const { collectionId, recipient } = req.body;
    const auth = req.headers.authorization;
    const resp = await sendInvite({
      authToken: String(auth),
      payload: {
        collection: collectionId,
        recipient,
      },
    });
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  getInvites: async (req: Request, res: Response) => {
    const auth = req.headers.authorization;
    const resp = await getAllInvites(String(auth), {});
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  getAnInvite: async (req: Request, res: Response) => {
    const id = req.params.id;
    const auth = req.headers.authorization;
    const resp = await getAnInvite(String(auth), id);
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  acceptInvite: async (req: Request, res: Response) => {
    const id = req.params.id;
    const auth = req.headers.authorization;
    const resp = await acceptInvite(String(auth), id);
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  declineInvite: async (req: Request, res: Response) => {
    const id = req.params.id;
    const auth = req.headers.authorization;
    const resp = await declineInvite(String(auth), id);
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
};
export default InviteController;
