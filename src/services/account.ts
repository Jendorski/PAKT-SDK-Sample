import {
  FilterUserDto,
  FindUsers,
  IUser,
  ResponseDto,
  Status,
  TwoFATypeDto,
  updateUserDto,
} from "pakt-sdk";
import { internalResponse } from "../utils";

const TAG = "services/account";

export const changePassword = async ({
  oldPassword,
  newPassword,
}: {
  oldPassword: string;
  newPassword: string;
}) => {
  try {
    const change: ResponseDto<IUser> = await init.account.changePassword(
      oldPassword,
      newPassword
    );
    if (change.status === Status.ERROR)
      return internalResponse(
        true,
        Number(change.code ?? change.statusCode),
        String(change.message),
        change
      );
    return internalResponse(
      false,
      Number(change.code ?? change.statusCode),
      String(change.message),
      change
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const updateAccount = async ({
  payload,
}: {
  payload: updateUserDto;
}) => {
  try {
    const sampleUpdatePayload: updateUserDto = {
      profileImage: "",
      bgImage: "",
      meta: {},
      profile: {
        contact: {
          country: "United Kingdom",
        },
      },
      userName: "",
    };
    const update: ResponseDto<IUser> = await init.account.updateAccount(
      payload
    );
    if (update.status === Status.ERROR)
      return internalResponse(
        true,
        Number(update.code ?? update.statusCode),
        String(update.message),
        update
      );
    return internalResponse(
      false,
      Number(update.code ?? update.statusCode),
      String(update.message),
      update
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const getUser = async () => {
  try {
    const get: ResponseDto<IUser> = await init.account.getUser();
    if (get.status === Status.ERROR)
      return internalResponse(
        true,
        Number(get.code ?? get.statusCode),
        String(get.message),
        get
      );
    return internalResponse(
      false,
      Number(get.code ?? get.statusCode),
      String(get.message),
      get
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const getAUser = async (userId: string) => {
  try {
    const get: ResponseDto<IUser> = await init.account.getAUser(userId);
    if (get.status === Status.ERROR)
      return internalResponse(
        true,
        Number(get.code ?? get.statusCode),
        String(get.message),
        get
      );
    return internalResponse(
      false,
      Number(get.code ?? get.statusCode),
      String(get.message),
      get
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const getUsers = async () => {
  try {
    const sampleFilter: FilterUserDto = {
      type: "recipient",
      tags: ["UI/UX", "NodeJS", "Typescript"],
    };
    const users: ResponseDto<FindUsers> = await init.account.getUsers(
      sampleFilter
    );
    if (users.status === Status.ERROR)
      return internalResponse(
        true,
        Number(users.code ?? users.statusCode),
        String(users.message),
        users
      );
    return internalResponse(
      false,
      Number(users.code ?? users.statusCode),
      String(users.message),
      users
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`, null);
    return internalResponse(true, 422, String(error), null);
  }
};

export const initiateTwoFA = async (type: TwoFATypeDto) => {
  try {
    const initiate = await init.account.initate2FA(type);
    if (initiate.status === Status.ERROR)
      return internalResponse(
        true,
        Number(initiate.code ?? initiate.statusCode),
        String(initiate.message),
        initiate
      );
    return internalResponse(
      false,
      Number(initiate.code ?? initiate.statusCode),
      String(initiate.message),
      initiate
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const activateTwoFA = async (code: string) => {
  try {
    const activate = await init.account.activate2FA(code);
    if (activate.status === Status.ERROR)
      return internalResponse(
        true,
        Number(activate.code ?? activate.statusCode),
        String(activate.message),
        activate
      );
    return internalResponse(
      false,
      Number(activate.code ?? activate.statusCode),
      String(activate.message),
      activate
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const deactivateTwoFA = async (code: string) => {
  try {
    const deactivate = await init.account.deactivate2FA(code);
    if (deactivate.status === Status.ERROR)
      return internalResponse(
        true,
        Number(deactivate.code ?? deactivate.statusCode),
        String(deactivate.message),
        deactivate
      );
    return internalResponse(
      false,
      Number(deactivate.code ?? deactivate.statusCode),
      String(deactivate.message),
      deactivate
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const sendEmailTwoFA = async () => {
  try {
    const sendEmailTwoFA = await init.account.sendEmailTwoFA();
    if (sendEmailTwoFA.status === Status.ERROR)
      return internalResponse(
        true,
        Number(sendEmailTwoFA.code ?? sendEmailTwoFA.statusCode),
        String(sendEmailTwoFA.message),
        sendEmailTwoFA
      );
    return internalResponse(
      false,
      Number(sendEmailTwoFA.code ?? sendEmailTwoFA.statusCode),
      String(sendEmailTwoFA.message),
      sendEmailTwoFA
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::sendEmailTwoFA${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const logout = async () => {
  try {
    const logUserOut = await init.account.logout();
    if (logUserOut.status === Status.ERROR)
      return internalResponse(
        true,
        Number(logUserOut.code ?? logUserOut.statusCode),
        String(logUserOut.message),
        logUserOut
      );
    return internalResponse(
      false,
      Number(logUserOut.code ?? logUserOut.statusCode),
      String(logUserOut.message),
      logUserOut
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};
