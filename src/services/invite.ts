import {
  ICollectionDto,
  IInviteDto,
  ResponseDto,
  SendInviteDto,
  Status,
} from "pakt-sdk";
import { internalResponse } from "../utils";

export const sendInvite = async ({
  authToken,
  payload,
}: {
  authToken: string;
  payload: SendInviteDto;
}) => {
  try {
    const send = await init.invite.sendInvite(authToken, payload);
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

export const acceptInvite = async (authToken: string, inviteId: string) => {
  try {
    const accept = await init.invite.acceptInvite(authToken, inviteId);
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

export const declineInvite = async (authToken: string, inviteId: string) => {
  try {
    const decline: ResponseDto<{}> = await init.invite.declineInvite(
      authToken,
      inviteId
    );
    if (decline.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(decline.message),
        decline
      );
    return internalResponse(
      false,
      Number(200),
      String(decline.message),
      decline
    );
  } catch (error: Error | unknown) {
    console.log("declineInvite:, ", { error });
    return internalResponse(true, 422, String(error), null);
  }
};

export const getAllInvites = async (
  authToken: string,
  filter: Record<string, any> | IInviteDto
) => {
  try {
    // const newFilter = {
    //   sender: "12345678909",
    //   reciever: "12345678909",
    //   status: "pending",
    // };
    const gets = await init.invite.getAll(authToken, filter);
    console.log({ gets });
    if (gets.status === Status.ERROR)
      return internalResponse(true, Number(422), String(gets.message), gets);
    return internalResponse(false, Number(200), String(gets.message), gets);
  } catch (error: Error | unknown) {
    console.log("getAllInvites:, ", { error });
    return internalResponse(true, 422, String(error), null);
  }
};

export const getAnInvite = async (authToken: string, inviteId: string) => {
  try {
    const anInvite: ResponseDto<IInviteDto> = await init.invite.getAnInvite(
      authToken,
      inviteId
    );
    const { _id, data } = anInvite.data;
    console.log({ _id });

    const collection: ICollectionDto = data as ICollectionDto;

    const collectionId = collection?._id;
    console.log({ collectionId });

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
