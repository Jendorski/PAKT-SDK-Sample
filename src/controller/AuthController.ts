import { Request, Response } from "express";
import {
  login,
  registration,
  resendVerificationLink,
  resetPassword,
  verifyAccount,
} from "../services/auth";
import Utils from "../utils/response";

const { success, failed } = Utils;

const AuthController = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email) return failed(res, null, "Supply email", 400);
    if (!password) return failed(res, null, "Supply password", 400);

    const resp = await login({ email, password });
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  register: async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, referral } = req.body;

    if (!firstName) return failed(res, null, "Supply firstName", 400);
    if (!lastName) return failed(res, null, "Supply lastName", 400);
    //if (!referral) return failed(res, null, "Supply referral", 400);
    if (!email) return failed(res, null, "Supply email", 400);
    if (!password) return failed(res, null, "Supply password", 400);

    const resp = await registration({
      firstName,
      lastName,
      email,
      password,
      referral,
    });
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  verifyAccount: async (req: Request, res: Response) => {
    const { tempToken, emailToken } = req.body;
    if (!tempToken) return failed(res, null, "Supply tempToken", 400);
    if (!emailToken) return failed(res, null, "Supply emailToken", 400);

    const resp = await verifyAccount({
      tempAuthToken: tempToken,
      token: emailToken,
    });
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  resendVerification: async (req: Request, res: Response) => {
    const { email } = req.body;
    const resp = await resendVerificationLink(email);
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  resetPassword: async (req: Request, res: Response) => {
    const { email } = req.body;
    const resp = await resetPassword(email);
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
};
export default AuthController;
