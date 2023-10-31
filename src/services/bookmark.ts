import {
  FindCollectionBookMarkDto,
  ICollectionBookmarkDto,
  ResponseDto,
  Status,
  createBookMarkDto,
  filterBookmarkDto,
} from "pakt-sdk";
import Utils from "../utils/response";

const { internalResponse } = Utils;

const TAG = "bookmark";

export const createBookmark = async ({
  authToken,
  payload,
}: {
  authToken: string;
  payload: createBookMarkDto;
}) => {
  try {
    const created: ResponseDto<ICollectionBookmarkDto> =
      await init.bookmark.create(authToken, payload);

    if (created.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(created.message),
        created
      );
    return internalResponse(
      false,
      Number(200),
      String(created.message),
      created
    );
  } catch (error: Error | unknown) {
    console.log(`${TAG}::createBookmark ${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const fetchBookmarks = async (
  authToken: string,
  filter: filterBookmarkDto
) => {
  //filter by the type.
  try {
    const bookmarks: ResponseDto<FindCollectionBookMarkDto> =
      await init.bookmark.getAll(authToken, filter);
    if (bookmarks.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(bookmarks.message),
        bookmarks
      );
    return internalResponse(
      false,
      Number(200),
      String(bookmarks.message),
      bookmarks
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::fetchBookmarks ${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const fetchABookMark = async (authToken: string, id: string) => {
  try {
    const aBookmark: ResponseDto<ICollectionBookmarkDto> =
      await init.bookmark.getById(authToken, id, {});
    console.log({ aBookmark });
    if (aBookmark.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(aBookmark.message),
        aBookmark
      );
    return internalResponse(
      false,
      Number(200),
      String(aBookmark.message),
      aBookmark
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::fetchABookMark ${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const deleteABookmark = async (authToken: string, id: string) => {
  try {
    const deleted: ResponseDto<{}> = await init.bookmark.delete(authToken, id);
    if (deleted.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(deleted.message),
        deleted
      );
    return internalResponse(
      false,
      Number(200),
      String(deleted.message),
      deleted
    );
  } catch (error: Error | unknown) {
    console.log(`${TAG}::deleteABookmark ${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};
