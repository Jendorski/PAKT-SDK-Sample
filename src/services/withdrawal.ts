import {
  CreateWithdrawal,
  FilterWithdrawal,
  IPaymentCoins,
  Status,
} from "pakt-sdk";
import Utils from "../utils/response";

const { internalResponse } = Utils;

export const createWithdrawal = async ({
  authToken,
  amount,
  address,
  password,
  coin,
}: {
  authToken: string;
  amount: number;
  address: string;
  password: string;
  coin: IPaymentCoins;
}) => {
  try {
    const payload: CreateWithdrawal = {
      amount,
      address,
      password,
      coin,
    };
    const resp = await init.withdrawal.createWithdrawal(authToken, payload);
    if (resp.status === Status.ERROR)
      return internalResponse(true, Number(422), String(resp.message), resp);
    return internalResponse(false, Number(200), String(resp.message), resp);
  } catch (error: Error | unknown) {
    return internalResponse(true, 422, String(error), null);
  }
};

export const getWithdrawalRecords = async (
  authToken: string,
  owner?: string,
  page?: number,
  limit?: number
) => {
  try {
    const filter: FilterWithdrawal = {
      page,
      limit,
      owner: String(owner),
    };

    const resp = await init.withdrawal.fetchWithdrawal(authToken, filter);
    if (resp.status === Status.ERROR)
      return internalResponse(true, Number(422), String(resp.message), resp);
    return internalResponse(false, Number(200), String(resp.message), resp);
  } catch (error: Error | unknown) {
    return internalResponse(true, 422, String(error), null);
  }
};
