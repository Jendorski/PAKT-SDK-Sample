import { Request, Response } from "express";
import { getChatMessages } from "../services/chat";
import { removeString } from "../utils/helper";
import Utils from "../utils/response";

const { success, failed } = Utils;

const ChatController = {
  getMessages: async (req: Request, res: Response) => {
    const auth = removeString(String(req.headers.authorization), "Bearer ");
    const resp = await getChatMessages(String(auth));

    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
};
export default ChatController;
