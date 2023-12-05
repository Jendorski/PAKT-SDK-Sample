import { Request, Response } from "express";
import { getAllNotifications } from "../services/notifications";
import { removeString } from "../utils/helper";
import Utils from "../utils/response";

const { failed, success } = Utils;

const NotificationController = {
  fetchNotifications: async (req: Request, res: Response) => {
    const auth = removeString(String(req.headers.authorization), "Bearer ");

    const resp = await getAllNotifications(auth, { ...req.query });
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
};
export default NotificationController;
