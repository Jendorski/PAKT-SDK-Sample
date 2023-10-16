import { Request, Response } from "express";
import { login } from "../services/auth";
import Utils from "../utils/response";

const { success, failed } = Utils;

const AuthController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    console.log({ ...req.body });
    const resp = await login({ email, password });
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  register: async (req: Request, res: Response) => {},
  verifyAccount: async (req: Request, res: Response) => {},
  resendVerification: async (req: Request, res: Response) => {},
  resetPassword: async (req: Request, res: Response) => {},
};
export default AuthController;
