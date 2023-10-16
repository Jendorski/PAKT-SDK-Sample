import {
  CreateFeedDto,
  FindFeedDto,
  IFeed,
  ResponseDto,
  Status,
} from "pakt-sdk";
import { internalResponse } from "../utils";

export const createFeed = async (payload: CreateFeedDto) => {
  try {
    const feed: ResponseDto<{}> = await init.feed.create(payload);
    if (feed.status === Status.ERROR)
      return internalResponse(true, Number(422), String(feed.message), feed);
    return internalResponse(false, Number(200), String(feed.message), feed);
  } catch (error: Error | unknown) {
    console.error({ error });
    return internalResponse(true, 422, String(error), null);
  }
};

export const getFeeds = async (filter?: Record<string, any>) => {
  try {
    const feeds: ResponseDto<FindFeedDto> = await init.feed.getAll(filter);
    if (feeds.status === Status.ERROR)
      return internalResponse(true, Number(422), String(feeds.message), feeds);
    return internalResponse(false, Number(200), String(feeds.message), feeds);
  } catch (error: Error | unknown) {
    console.error({ error });
    return internalResponse(true, 422, String(error), null);
  }
};

export const getAFeed = async (feedId: string) => {
  try {
    const feed: ResponseDto<IFeed> = await init.feed.getById(feedId);
    if (feed.status === Status.ERROR)
      return internalResponse(true, Number(422), String(feed.message), feed);
    return internalResponse(false, Number(200), String(feed.message), feed);
  } catch (error: Error | unknown) {
    console.error({ error });
    return internalResponse(true, 422, String(error), null);
  }
};
