import { Status } from "pakt-sdk";
import { internalResponse } from "../utils";

const TAG = "services/chat";

export const getChatMessages = async () => {
  try {
    const messsages = await init.chat.getUserMessages();
    if (messsages.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(messsages.message),
        messsages
      );
    return internalResponse(
      false,
      Number(200),
      String(messsages.message),
      messsages
    );
  } catch (error: Error | unknown) {
    console.log({ error: `${TAG}::getChatMessages ${String(error)}` });
    return internalResponse(true, 422, String(error), null);
  }
};
