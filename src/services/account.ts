import {
  IUser,
  ResponseDto,
  Status,
  TwoFATypeDto,
  updateUserDto,
} from "pakt-sdk";

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
    if (change.status === Status.ERROR) return null;
    return change.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};

export const updateAccount = async ({
  payload,
}: {
  payload: updateUserDto;
}) => {
  try {
    const update: ResponseDto<IUser> = await init.account.updateAccount(
      payload
    );
    if (update.status === Status.ERROR) return null;
    return update.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};

export const getUser = async () => {
  try {
    const get: ResponseDto<IUser> = await init.account.getUser();
    if (get.status === Status.ERROR) return null;
    return get.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};

export const initiateTwoFA = async (type: TwoFATypeDto) => {
  try {
    const initiate = await init.account.initate2FA(type);
    if (initiate.status === Status.ERROR) return null;
    return initiate.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};

export const activateTwoFA = async (code: string) => {
  try {
    const activate = await init.account.active2FA(code);
    if (activate.status === Status.ERROR) return null;
    return activate.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};

export const deactivateTwoFA = async (code: string) => {
  try {
    const deactivate = await init.account.deactive2FA(code);
    if (deactivate.status === Status.ERROR) return null;
    return deactivate.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};

export const logout = async () => {
  try {
    const logUserOut = await init.account.logout();
    if (logUserOut.status === Status.ERROR) return null;
    return logUserOut.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};
