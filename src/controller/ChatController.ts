import { Request, Response } from "express";
import { getChatMessages } from "../services/chat";
import Utils from "../utils/response";

const { success, failed } = Utils;

const ChatController = {
  getMessages: async (req: Request, res: Response) => {
    const auth = req.headers.authorization;
    const resp = await getChatMessages(String(auth));

    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
};
export default ChatController;
