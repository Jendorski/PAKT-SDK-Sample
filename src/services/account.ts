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
  authToken,
  oldPassword,
  newPassword,
}: {
  authToken: string;
  oldPassword: string;
  newPassword: string;
}) => {
  try {
    const change: ResponseDto<IUser> = await init.account.changePassword(
      authToken,
      oldPassword,
      newPassword
    );
    if (change.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(change.message),
        change
      );
    return internalResponse(false, Number(200), String(change.message), change);
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const updateAccount = async ({
  authToken,
  payload,
}: {
  authToken: string;
  payload: updateUserDto;
}) => {
  try {
    // const sampleUpdatePayload: updateUserDto = {
    //   profileImage: "",
    //   bgImage: "",
    //   meta: {},
    //   profile: {
    //     contact: {
    //       country: "United Kingdom",
    //     },
    //   },
    //   userName: "",
    // };
    const update: ResponseDto<IUser> = await init.account.updateAccount(
      payload,
      authToken
    );
    if (update.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(update.message),
        update
      );
    return internalResponse(false, Number(200), String(update.message), update);
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const getUser = async (authToken: string) => {
  try {
    const get: ResponseDto<IUser> = await init.account.getUser(authToken);
    console.log({ get: { ...get } });
    if (Number(get.code) > 226)
      return internalResponse(true, Number(422), String(get.message), get);
    return internalResponse(false, Number(200), String(get.message), get);
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const getAUser = async (authToken: string, userId: string) => {
  try {
    const get: ResponseDto<IUser> = await init.account.getAUser(
      userId,
      authToken
    );
    console.log({ aUser: { ...get } });
    if (Number(get.code) > 226)
      return internalResponse(true, Number(get.code), String(get.message), get);
    return internalResponse(false, Number(200), String(get.message), get);
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const getUsers = async (
  authToken: string,
  filter?: Record<string, any>
) => {
  try {
    const sampleFilter: FilterUserDto = {
      type: "recipient",
      tags: ["UI/UX", "NodeJS", "Typescript"],
    };
    console.log({ sampleFilter });
    const users: ResponseDto<FindUsers> = await init.account.getUsers(
      authToken,
      filter
    );
    if (users.status === Status.ERROR)
      return internalResponse(true, Number(422), String(users.message), users);
    return internalResponse(false, Number(200), String(users.message), users);
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`, null);
    return internalResponse(true, 422, String(error), null);
  }
};

export const initiateTwoFA = async (authToken: string, type: TwoFATypeDto) => {
  try {
    const initiate = await init.account.initate2FA(type, authToken);
    if (initiate.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(initiate.message),
        initiate
      );
    return internalResponse(
      false,
      Number(200),
      String(initiate.message),
      initiate
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const activateTwoFA = async (code: string, authToken: string) => {
  try {
    const activate = await init.account.activate2FA(code, authToken);
    if (activate.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(activate.message),
        activate
      );
    return internalResponse(
      false,
      Number(200),
      String(activate.message),
      activate
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const deactivateTwoFA = async (code: string, authToken: string) => {
  try {
    const deactivate = await init.account.deactivate2FA(code, authToken);
    if (deactivate.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(deactivate.message),
        deactivate
      );
    return internalResponse(
      false,
      Number(200),
      String(deactivate.message),
      deactivate
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const sendEmailTwoFA = async (authToken: string) => {
  try {
    const sendEmailTwoFA = await init.account.sendEmailTwoFA(authToken);
    if (sendEmailTwoFA.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(sendEmailTwoFA.message),
        sendEmailTwoFA
      );
    return internalResponse(
      false,
      Number(200),
      String(sendEmailTwoFA.message),
      sendEmailTwoFA
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::sendEmailTwoFA${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const logout = async (authToken: string) => {
  try {
    const logUserOut = await init.account.logout(authToken);
    if (logUserOut.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(logUserOut.message),
        logUserOut
      );
    return internalResponse(
      false,
      Number(200),
      String(logUserOut.message),
      logUserOut
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};
