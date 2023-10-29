import { IConnectionFilter, Status } from "pakt-sdk";
import { internalResponse } from "../utils";

export const updateConnectionFilter = async (authToken: string) => {
  try {
    const payload: IConnectionFilter = {
      _id: "",
      event: "CREATE_CONVERSATION", // CREATE_JOB, ASSIGN_JOB, CREATE_CONVERSATION
      key: "tagCount", //afroScore, tagCount, tags
      value: 12,
      decider: "less_than", //contains, between, greater_than, equal_to, less_than
    };

    const upd = await init.connectionFilter.update(authToken, payload);
    if (upd.status === Status.ERROR)
      return internalResponse(true, Number(422), String(upd.message), upd);
    return internalResponse(false, Number(200), String(upd.message), upd);
  } catch (error: Error | unknown) {
    console.log("updateConnectionFilter: ", { error });
    return internalResponse(true, 422, String(error), null);
  }
};

export const getConnectionFilter = async (authToken: string) => {
  try {
    const get = await init.connectionFilter.getForAUser(authToken);
    if (get.status === Status.ERROR)
      return internalResponse(true, Number(422), String(get.message), get);
    return internalResponse(false, Number(200), String(get.message), get);
  } catch (error: Error | unknown) {
    console.log("getConnectionFilter: ", { error });
    return internalResponse(true, 422, String(error), null);
  }
};
