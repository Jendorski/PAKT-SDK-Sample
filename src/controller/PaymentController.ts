import { Request, Response } from "express";
import {
  createOrder,
  fetchActiveRPCs,
  fetchPaymentMethods,
  releaseOrder,
  validateOrder,
} from "../services/payment";
import { removeString } from "../utils/helper";
import Utils from "../utils/response";

const { failed, success } = Utils;

const PaymentController = {
  createOrder: async (req: Request, res: Response) => {
    const auth = removeString(String(req.headers.authorization), "Bearer ");

    const { coin, collection } = req.body;

    const resp = await createOrder({ authToken: auth, coin, collection });
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  validateOrder: async (req: Request, res: Response) => {
    const auth = removeString(String(req.headers.authorization), "Bearer ");

    const { collection } = req.body;

    const resp = await validateOrder({ authToken: auth, collection });
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  releasePayment: async (req: Request, res: Response) => {
    const auth = removeString(String(req.headers.authorization), "Bearer ");

    const { collection, amount } = req.body;

    const resp = await releaseOrder({ authToken: auth, collection, amount });
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  activeRPC: async (req: Request, res: Response) => {
    const auth = removeString(String(req.headers.authorization), "Bearer ");

    const resp = await fetchActiveRPCs({ authToken: auth });
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  paymentMethods: async (req: Request, res: Response) => {
    const auth = removeString(String(req.headers.authorization), "Bearer ");

    const resp = await fetchPaymentMethods({ authToken: auth });
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
};
export default PaymentController;
