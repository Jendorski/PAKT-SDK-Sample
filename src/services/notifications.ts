import { FindNotificationDto, ResponseDto, Status } from "pakt-sdk";
import { internalResponse } from "../utils";

export const getAllNotifications = async (filter?: Record<string, any>) => {
  try {
    const notifications: ResponseDto<FindNotificationDto> =
      await init.notifications.getAll(filter);
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
