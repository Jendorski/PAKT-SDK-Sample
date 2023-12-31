import {
  FindTransactionsDto,
  ITransactionDto,
  ITransactionStatsDto,
  IWalletDto,
  IWalletExchangeDto,
  ResponseDto,
  Status,
} from "pakt-sdk";
import { internalResponse } from "../utils";

const TAG = "services/wallet";

export const fetchWallets = async (authToken: string) => {
  try {
    const wallets: ResponseDto<IWalletDto[]> = await init.wallet.getWallets(
      authToken
    );
    if (wallets.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(wallets.message),
        wallets
      );
    return internalResponse(
      false,
      Number(200),
      String(wallets.message),
      wallets
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

// export const fetchWalletData = async (authToken: string) => {
//   try {
//     const walletData: ResponseDto<IWalletDto> = await init.wallet.getWalletData(
//       authToken
//     );
//     if (walletData.status === Status.ERROR)
//       return internalResponse(
//         true,
//         Number(422),
//         String(walletData.message),
//         walletData
//       );
//     return internalResponse(
//       false,
//       Number(200),
//       String(walletData.message),
//       walletData
//     );
//   } catch (error: Error | unknown) {
//     console.error(`${TAG}::${String(error)}`);
//     return internalResponse(true, 422, String(error), null);
//   }
// };

export const getTransactions = async (authToken: string) => {
  try {
    const txns: ResponseDto<FindTransactionsDto> =
      await init.wallet.getTransactions(authToken);
    if (txns.status === Status.ERROR)
      return internalResponse(true, Number(422), String(txns.message), txns);
    return internalResponse(false, Number(200), String(txns.message), txns);
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const getTransactionsStats = async (authToken: string) => {
  try {
    const txnStats: ResponseDto<ITransactionStatsDto[]> =
      await init.wallet.getTransactionStats(authToken, "monthly");
    if (txnStats.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(txnStats.message),
        txnStats
      );
    return internalResponse(
      false,
      Number(200),
      String(txnStats.message),
      txnStats
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const getATransaction = async (authToken: string, id: string) => {
  try {
    const aTxn: ResponseDto<ITransactionDto> =
      await init.wallet.getATransaction(authToken, id);
    if (aTxn.status === Status.ERROR)
      return internalResponse(true, Number(422), String(aTxn.message), aTxn);
    return internalResponse(false, Number(200), String(aTxn.message), aTxn);
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const getExchange = async (authToken: string) => {
  try {
    const exchange: ResponseDto<IWalletExchangeDto> =
      await init.wallet.getExchange(authToken);
    if (exchange.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(exchange.message),
        exchange
      );
    return internalResponse(
      false,
      Number(200),
      String(exchange.message),
      exchange
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};
