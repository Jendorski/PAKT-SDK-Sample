import {
  AccountVerifyDto,
  LoginDto,
  RegisterDto,
  ResetDto,
  ResponseDto,
  Status,
} from "pakt-sdk";

const TAG = "services/auth";

export const registration = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    const register: ResponseDto<RegisterDto> = await global.init.auth.register(
      firstName,
      lastName,
      email,
      password
    );

    if (register.status === Status.ERROR) return null;
    return register.data;
  } catch (error: Error | unknown) {
    return null;
  }
};

export const verifyAccount = async ({
  tempAuthToken,
  token,
}: {
  tempAuthToken: string;
  token: string;
}) => {
  try {
    const verifyAccount: ResponseDto<AccountVerifyDto> =
      await init.auth.verifyAccount(tempAuthToken, token);

    if (verifyAccount.status === Status.ERROR) return null;
    return verifyAccount.data;
  } catch (error: Error | unknown) {
    console.log({ error });
    return null;
  }
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const login: ResponseDto<LoginDto> = await init.auth.login(email, password);
    if (login.status === Status.ERROR) return null;
    return login.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};

export const resendVerificationLink = async (email: string) => {
  try {
    const resent: ResponseDto<ResetDto> = await init.auth.resendVerifyLink(
      email
    );
    if (resent.status === Status.ERROR) return null;
    return resent.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};

export const resetPassword = async (email: string) => {
  try {
    const reset: ResponseDto<ResetDto> = await init.auth.resetPassword(email);
    if (reset.status === Status.ERROR) return null;
    return reset.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};

export const changePassword = async ({
  token,
  password,
}: {
  token: string;
  password: string;
}) => {
  try {
    const change: ResponseDto<void> = await init.auth.changePassword(
      token,
      password
    );
    if (change.status === Status.ERROR) return null;
    return change.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};

export const validatePasswordToken = async (token: string) => {
  try {
    const validate: ResponseDto<void> = await init.auth.validatePasswordToken(
      token
    );
    if (validate.status === Status.ERROR) return null;
    return validate.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};
