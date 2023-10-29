import { Request, Response } from "express";
import {
  getAUser,
  getUser,
  getUsers,
  updateAccount,
} from "../services/account";
import { removeString } from "../utils/helper";
import Utils from "../utils/response";

const { success, failed } = Utils;

const AccountController = {
  fetchUsers: async (req: Request, res: Response) => {
    const auth = removeString(String(req.headers.authorization), "Bearer ");
    const resp = await getUsers(String(auth), { ...req.query });
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  fetchAUser: async (req: Request, res: Response) => {
    const id = req.params.id;
    const auth = removeString(String(req.headers.authorization), "Bearer ");
    console.log({ auth });
    const resp = await getAUser(String(auth), id);
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  fetchUser: async (req: Request, res: Response) => {
    const auth = removeString(String(req.headers.authorization), "Bearer ");
    const resp = await getUser(String(auth));
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  updateAnAccount: async (req: Request, res: Response) => {
    const auth = removeString(String(req.headers.authorization), "Bearer ");
    const resp = await updateAccount({
      payload: { ...req.body },
      authToken: String(auth),
    });
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
};
export default AccountController;
