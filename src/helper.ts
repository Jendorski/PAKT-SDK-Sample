/**
 * Sample project on how to use the PAKT SDK.
 *
 * First we go to:
 * https://paktui.herokuapp.com/auth/login, the PAKT test environment to login or register, if you do not have an account.
 *
 * Then create a chainsite, make a 5 TUSDC payment with the Test USDC.
 *
 * After the payment, the chainsite can be activated.
 *
 * Upon activation of the chainsite, the api url of the chainsite is required.
 *
 * Then, generate the public key for the newly activated chainsite.
 *
 * In your project, both the api url and the public key are needed for usage.
 *
 * In this sample project, we will be exploring each and every feature.
 */

import { PaktConfig, PaktSDK } from "pakt-sdk";
import config from "./config";

declare global {
  var init: PaktSDK;
}

const TAG = "examples";

export const initialize = async () => {
  try {
    const paktConfig: PaktConfig = {
      baseUrl: String(config.BASE_URL),
      token: String(config.AUTH_TOKEN),
    };
    globalThis.init = await PaktSDK.init(paktConfig);
    return init;
  } catch (error: Error | unknown) {
    console.error(`${TAG}:: ${String(error)}`);
    return null;
  }
};
