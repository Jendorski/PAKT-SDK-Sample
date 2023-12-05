import { FindNotificationDto, ResponseDto, Status } from "pakt-sdk";
import { internalResponse } from "../utils";

export const getAllNotifications = async (
  authToken: string,
  filter?: Record<string, any>
) => {
  try {
    const notifications: ResponseDto<FindNotificationDto> =
      await init.notifications.getAll(authToken, filter);
    if (notifications.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(notifications.message),
        notifications
      );
    return internalResponse(
      false,
      Number(200),
      String(notifications.message),
      notifications
    );
  } catch (error: Error | unknown) {
    console.error({ error });
    return internalResponse(true, 422, String(error), null);
  }
};

export const markAllAsRead = async (authToken: string) => {
  try {
    const resp: ResponseDto<void> = await init.notifications.markAll(authToken);
    if (resp.status === Status.ERROR || Number(resp.code) > 226)
      return internalResponse(
        true,
        Number(resp.code || resp.statusCode),
        String(resp.message),
        resp
      );
    return internalResponse(
      false,
      Number(resp.code || resp.statusCode),
      String(resp.message),
      resp
    );
  } catch (error: Error | unknown) {
    console.error("Error, ", error);
    return internalResponse(true, 422, String(error), null);
  }
};

export const markOne = async (authToken: string, notificationID: string) => {
  try {
    const resp = await init.notifications.markOneAsRead(
      authToken,
      notificationID
    );
    if (resp.status === Status.ERROR || Number(resp.code) > 226)
      return internalResponse(
        true,
        Number(resp.code || resp.statusCode),
        String(resp.message),
        resp
      );
    return internalResponse(
      false,
      Number(resp.code || resp.statusCode),
      String(resp.message),
      resp
    );
  } catch (error: Error | unknown) {
    console.error("Error, ", error);
    return internalResponse(true, 422, String(error), null);
  }
};
