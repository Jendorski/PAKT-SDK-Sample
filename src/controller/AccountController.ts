import { Request, Response } from "express";
import {
  getAUser,
  getUser,
  getUsers,
  updateAccount,
} from "../services/account";
import Utils from "../utils/response";

const { success, failed } = Utils;

const AccountController = {
  fetchUsers: async (req: Request, res: Response) => {
    const resp = await getUsers({ ...req.query });
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  fetchAUser: async (req: Request, res: Response) => {
    const id = req.params.id;
    const resp = await getAUser(id);
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  fetchUser: async (req: Request, res: Response) => {
    const resp = await getUser();
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  updateAnAccount: async (req: Request, res: Response) => {
    const resp = await updateAccount({ ...req.body });
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
};
export default AccountController;
