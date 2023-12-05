import { Request, Response } from "express";
import { createWithdrawal, getWithdrawalRecords } from "../services/withdrawal";
import { removeString } from "../utils/helper";
import Utils from "../utils/response";

const { success, failed } = Utils;

const WithdrawalController = {
  create: async (req: Request, res: Response) => {
    const auth = removeString(String(req.headers.authorization), "Bearer ");

    const { password, address, amount, coin } = req.body;

    const resp = await createWithdrawal({
      authToken: auth,
      password,
      coin,
      amount,
      address,
    });
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  getRecords: async (req: Request, res: Response) => {
    const auth = removeString(String(req.headers.authorization), "Bearer ");
    const resp = await getWithdrawalRecords(auth);
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
};
export default WithdrawalController;
