import {
  AccountVerifyDto,
  LoginDto,
  RegisterDto,
  ResetDto,
  ResponseDto,
  Status,
} from "pakt-sdk";
import { internalResponse } from "../utils";

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
    const payload = {
      firstName: "Aleesha",
      lastName: "Drussell",
      email: "pastelpurple30@lmaritimen.com",
      password: "1234567890",
      referral: "I5dt",
    };

    const register: ResponseDto<RegisterDto> = await init.auth.register(
      payload
    );

    if (register.status === Status.ERROR)
      return internalResponse(
        true,
        Number(register.code ?? register.statusCode),
        String(register.message),
        register
      );
    return internalResponse(
      false,
      Number(register.code ?? register.statusCode),
      String(register.message),
      register
    );
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

    if (verifyAccount.status === Status.ERROR)
      return internalResponse(
        true,
        Number(verifyAccount.code ?? verifyAccount.statusCode),
        String(verifyAccount.message),
        verifyAccount
      );
    return internalResponse(
      false,
      Number(verifyAccount.code ?? verifyAccount.statusCode),
      String(verifyAccount.message),
      verifyAccount
    );
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
    console.log({ login });
    if (login.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(`${login.status}_${login.message}`),
        login
      );
    return internalResponse(
      false,
      Number(200),
      String(login.message),
      login.data
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const resendVerificationLink = async (email: string) => {
  try {
    const resent: ResponseDto<ResetDto> = await init.auth.resendVerifyLink(
      email
    );
    if (resent.status === Status.ERROR)
      return internalResponse(
        true,
        Number(resent.code ?? resent.statusCode),
        String(resent.message),
        resent
      );
    return internalResponse(
      false,
      Number(resent.code ?? resent.statusCode),
      String(resent.message),
      resent
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};

export const resetPassword = async (email: string) => {
  try {
    const reset: ResponseDto<ResetDto> = await init.auth.resetPassword(email);
    if (reset.status === Status.ERROR)
      return internalResponse(
        true,
        Number(reset.code ?? reset.statusCode),
        String(reset.message),
        reset
      );
    return internalResponse(
      false,
      Number(reset.code ?? reset.statusCode),
      String(reset.message),
      reset
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};

export const changePassword = async ({
  token,
  tempToken,
  password,
}: {
  token: string;
  tempToken: string;
  password: string;
}) => {
  try {
    const change: ResponseDto<void> = await init.auth.changePassword(
      token,
      tempToken,
      password
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
    return null;
  }
};

export const validatePasswordToken = async (
  token: string,
  tempToken: string
) => {
  try {
    const validate: ResponseDto<void> = await init.auth.validatePasswordToken(
      token,
      tempToken
    );
    if (validate.status === Status.ERROR)
      return internalResponse(
        true,
        Number(validate.code ?? validate.statusCode),
        String(validate.message),
        validate
      );
    return internalResponse(
      false,
      Number(validate.code ?? validate.statusCode),
      String(validate.message),
      validate
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};
