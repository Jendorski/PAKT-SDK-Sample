import { Request, Response } from "express";
import { createOrder } from "../services/payment";
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
  validateOrder: async (req: Request, res: Response) => {},
  releasePayment: async (req: Request, res: Response) => {},
  activeRPC: async (req: Request, res: Response) => {},
  paymentMethods: async (req: Request, res: Response) => {},
};
export default PaymentController;
