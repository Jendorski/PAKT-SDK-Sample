import { IInviteDto, SendInviteDto, Status } from "pakt-sdk";
import { internalResponse } from "../utils";

export const sendInvite = async ({ payload }: { payload: SendInviteDto }) => {
  try {
    const send = await init.invite.sendInvite(payload);
    if (send.status === Status.ERROR)
      return internalResponse(
        true,
        Number(send.code ?? send.statusCode),
        String(send.message),
        send
      );
    return internalResponse(
      false,
      Number(send.code ?? send.statusCode),
      String(send.message),
      send
    );
  } catch (error: Error | unknown) {
    console.log("sendInvite: ", { error });
    return internalResponse(true, 422, String(error), null);
  }
};

export const acceptInvite = async (inviteId: string) => {
  try {
    const accept = await init.invite.acceptInvite(inviteId);
    if (accept.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(accept.message),
        accept
      );
    return internalResponse(false, Number(200), String(accept.message), accept);
  } catch (error: Error | unknown) {
    console.log("acceptInvite:, ", { error });
    return internalResponse(true, 422, String(error), null);
  }
};

export const declineInvite = async (inviteId: string) => {
  try {
    const accept = await init.invite.acceptInvite(inviteId);
    if (accept.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(accept.message),
        accept
      );
    return internalResponse(false, Number(200), String(accept.message), accept);
  } catch (error: Error | unknown) {
    console.log("declineInvite:, ", { error });
    return internalResponse(true, 422, String(error), null);
  }
};

export const getAllInvites = async (
  filter: Record<string, any> | IInviteDto
) => {
  try {
    // const newFilter = {
    //   sender: "12345678909",
    //   reciever: "12345678909",
    //   status: "pending",
    // };
    const gets = await init.invite.getAll(filter);
    if (gets.status === Status.ERROR)
      return internalResponse(true, Number(422), String(gets.message), gets);
    return internalResponse(false, Number(200), String(gets.message), gets);
  } catch (error: Error | unknown) {
    console.log("getAllInvites:, ", { error });
    return internalResponse(true, 422, String(error), null);
  }
};

export const getAnInvite = async (inviteId: string) => {
  try {
    const anInvite = await init.invite.getAnInvite(inviteId);
    if (anInvite.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(anInvite.message),
        anInvite
      );
    return internalResponse(
      false,
      Number(200),
      String(anInvite.message),
      anInvite
    );
  } catch (error: Error | unknown) {
    console.log("getAnInvite:, ", { error });
    return internalResponse(true, 422, String(error), null);
  }
};
