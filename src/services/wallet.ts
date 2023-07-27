import {
  FindTransactionsDto,
  ITransactionDto,
  ITransactionStatsDto,
  IWalletDto,
  IWalletExchangeDto,
  ResponseDto,
  Status,
} from "pakt-sdk";

const TAG = "services/wallet";

export const fetchWallets = async () => {
  try {
    const wallets: ResponseDto<IWalletDto[]> = await init.wallet.getWallets();
    if (wallets.status === Status.ERROR) return null;
    return wallets.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};

export const fetchWalletData = async () => {
  try {
    const walletData: ResponseDto<IWalletDto> =
      await init.wallet.getWalletData();
    if (walletData.status === Status.ERROR) return null;
    return walletData.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};

export const getTransactions = async () => {
  try {
    const txns: ResponseDto<FindTransactionsDto> =
      await init.wallet.getTransactions();
    if (txns.status === Status.ERROR) return null;
    return txns.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};

export const getTransactionsStats = async () => {
  try {
    const txnStats: ResponseDto<ITransactionStatsDto[]> =
      await init.wallet.getTransactionStats();
    if (txnStats.status === Status.ERROR) return null;
    return txnStats.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};

export const getATransaction = async (id: string) => {
  try {
    const aTxn: ResponseDto<ITransactionDto> =
      await init.wallet.getATransaction(id);
    if (aTxn.status === Status.ERROR) return null;
    return aTxn.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};

export const getExchange = async () => {
  try {
    const exchange: ResponseDto<IWalletExchangeDto> =
      await init.wallet.getExchange();
    if (exchange.status === Status.ERROR) return null;
    return exchange.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};
