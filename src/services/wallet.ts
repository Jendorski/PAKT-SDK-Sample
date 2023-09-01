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

export const fetchWallets = async () => {
  try {
    const wallets: ResponseDto<IWalletDto[]> = await init.wallet.getWallets();
    if (wallets.status === Status.ERROR)
      return internalResponse(
        true,
        Number(wallets.code ?? wallets.statusCode),
        String(wallets.message),
        wallets
      );
    return internalResponse(
      false,
      Number(wallets.code ?? wallets.statusCode),
      String(wallets.message),
      wallets
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const fetchWalletData = async () => {
  try {
    const walletData: ResponseDto<IWalletDto> =
      await init.wallet.getWalletData();
    if (walletData.status === Status.ERROR)
      return internalResponse(
        true,
        Number(walletData.code ?? walletData.statusCode),
        String(walletData.message),
        walletData
      );
    return internalResponse(
      false,
      Number(walletData.code ?? walletData.statusCode),
      String(walletData.message),
      walletData
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const getTransactions = async () => {
  try {
    const txns: ResponseDto<FindTransactionsDto> =
      await init.wallet.getTransactions();
    if (txns.status === Status.ERROR)
      return internalResponse(
        true,
        Number(txns.code ?? txns.statusCode),
        String(txns.message),
        txns
      );
    return internalResponse(
      false,
      Number(txns.code ?? txns.statusCode),
      String(txns.message),
      txns
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const getTransactionsStats = async () => {
  try {
    const txnStats: ResponseDto<ITransactionStatsDto[]> =
      await init.wallet.getTransactionStats();
    if (txnStats.status === Status.ERROR)
      return internalResponse(
        true,
        Number(txnStats.code ?? txnStats.statusCode),
        String(txnStats.message),
        txnStats
      );
    return internalResponse(
      false,
      Number(txnStats.code ?? txnStats.statusCode),
      String(txnStats.message),
      txnStats
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const getATransaction = async (id: string) => {
  try {
    const aTxn: ResponseDto<ITransactionDto> =
      await init.wallet.getATransaction(id);
    if (aTxn.status === Status.ERROR)
      return internalResponse(
        true,
        Number(aTxn.code ?? aTxn.statusCode),
        String(aTxn.message),
        aTxn
      );
    return internalResponse(
      false,
      Number(aTxn.code ?? aTxn.statusCode),
      String(aTxn.message),
      aTxn
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const getExchange = async () => {
  try {
    const exchange: ResponseDto<IWalletExchangeDto> =
      await init.wallet.getExchange();
    if (exchange.status === Status.ERROR)
      return internalResponse(
        true,
        Number(exchange.code ?? exchange.statusCode),
        String(exchange.message),
        exchange
      );
    return internalResponse(
      false,
      Number(exchange.code ?? exchange.statusCode),
      String(exchange.message),
      exchange
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};
