import { Request, Response } from "express";
import {
  createConnectionFilter,
  getConnectionFilter,
  updateConnectionFilter,
} from "../services/connectionFilter";
import { removeString } from "../utils/helper";
import Utils from "../utils/response";

const { failed, success } = Utils;

const ConnectionFilterController = {
  create: async (req: Request, res: Response) => {
    const auth = removeString(String(req.headers.authorization), "Bearer ");
    const { event, key, value, decider } = req.body;
    const resp = await createConnectionFilter({
      authToken: String(auth),
      event,
      key,
      value,
      decider,
    });
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  update: async (req: Request, res: Response) => {
    const auth = removeString(String(req.headers.authorization), "Bearer ");
    const resp = await updateConnectionFilter(String(auth));
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  get: async (req: Request, res: Response) => {
    const auth = removeString(String(req.headers.authorization), "Bearer ");
    const resp = await getConnectionFilter(String(auth));
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
};
export default ConnectionFilterController;
