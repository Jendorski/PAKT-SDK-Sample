import {
  IBlockchainCoinDto,
  ICreatePaymentDto,
  IPaymentCoins,
  IPaymentDataDto,
  IRPCDto,
  IReleasePaymentDto,
  IValidatePaymentDto,
  ResponseDto,
  Status,
} from "pakt-sdk";
import { internalResponse } from "../utils";

export const createOrder = async ({
  authToken,
  coin,
  collection,
}: {
  authToken: string;
  coin: IPaymentCoins;
  collection: string;
}) => {
  try {
    const payload: ICreatePaymentDto = {
      coin,
      collection,
    };
    const resp: ResponseDto<IPaymentDataDto> = await init.payment.create(
      authToken,
      payload
    );
    if (resp.status === Status.ERROR)
      return internalResponse(true, Number(422), String(resp.message), resp);
    return internalResponse(false, Number(200), String(resp.message), resp);
  } catch (error: Error | unknown) {
    return internalResponse(true, 422, String(error), null);
  }
};

export const validateOrder = async ({
  authToken,
  collection,
}: {
  authToken: string;
  collection: string;
}) => {
  try {
    const payload: IValidatePaymentDto = {
      collection,
    };
    const resp: ResponseDto<{}> = await init.payment.validate(
      authToken,
      payload
    );
    if (resp.status === Status.ERROR)
      return internalResponse(true, Number(422), String(resp.message), resp);
    return internalResponse(false, Number(200), String(resp.message), resp);
  } catch (error: Error | unknown) {
    return internalResponse(true, 422, String(error), null);
  }
};

export const releaseOrder = async ({
  authToken,
  amount,
  collection,
}: {
  authToken: string;
  amount: number;
  collection: string;
}) => {
  try {
    const payload: IReleasePaymentDto = {
      collection,
      amount,
    };
    const resp: ResponseDto<{}> = await init.payment.release(
      authToken,
      payload
    );
    if (resp.status === Status.ERROR)
      return internalResponse(true, Number(422), String(resp.message), resp);
    return internalResponse(false, Number(200), String(resp.message), resp);
  } catch (error: Error | unknown) {
    return internalResponse(true, 422, String(error), null);
  }
};

export const fetchPaymentMethods = async ({
  authToken,
}: {
  authToken: string;
}) => {
  try {
    const resp: ResponseDto<IBlockchainCoinDto[]> =
      await init.payment.paymentMethods(authToken);

    if (resp.status === Status.ERROR)
      return internalResponse(true, Number(422), String(resp.message), resp);
    return internalResponse(false, Number(200), String(resp.message), resp);
  } catch (error: Error | unknown) {
    return internalResponse(true, 422, String(error), null);
  }
};

export const fetchActiveRPCs = async ({ authToken }: { authToken: string }) => {
  try {
    const resp: ResponseDto<IRPCDto> = await init.payment.activeRpc(authToken);
    if (resp.status === Status.ERROR)
      return internalResponse(true, Number(422), String(resp.message), resp);
    return internalResponse(false, Number(200), String(resp.message), resp);
  } catch (error: Error | unknown) {
    return internalResponse(true, 422, String(error), null);
  }
};
