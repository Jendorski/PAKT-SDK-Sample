import {
  CreateCollectionDto,
  CreateManyCollectionDto,
  FindCollectionDto,
  FindCollectionTypeDto,
  ICollectionDto,
  ResponseDto,
  Status,
  UpdateCollectionDto,
  filterCollectionDto,
} from "pakt-sdk";
import { internalResponse } from "../utils";

const TAG = "services/collection";

export const createCollection = async ({
  payload,
}: {
  payload: CreateCollectionDto;
}) => {
  try {
    const create: ResponseDto<ICollectionDto> = await init.collection.create(
      payload
    );
    if (create.status === Status.ERROR)
      return internalResponse(
        true,
        Number(create.code ?? create.statusCode),
        String(create.message),
        create
      );
    return internalResponse(
      false,
      Number(create.code ?? create.statusCode),
      String(create.message),
      create
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const createMany = async ({
  collections,
}: {
  collections: CreateManyCollectionDto;
}) => {
  try {
    const many: ResponseDto<ICollectionDto[]> =
      await init.collection.createMany(collections);
    if (many.status === Status.ERROR)
      return internalResponse(
        true,
        Number(many.code ?? many.statusCode),
        String(many.message),
        many
      );
    return internalResponse(
      false,
      Number(many.code ?? many.statusCode),
      String(many.message),
      many
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

/**Fetch collections, the filter may be left empty.
 * For pagination, add the page and limit.
 * Filter by the fields in ICollectionDto
 */
export const fetchCollections = async ({
  filter,
}: {
  filter: filterCollectionDto;
}) => {
  try {
    const fetch: ResponseDto<FindCollectionDto> = await init.collection.getAll(
      filter
    );
    if (fetch.status === Status.ERROR)
      return internalResponse(
        true,
        Number(fetch.code ?? fetch.statusCode),
        String(fetch.message),
        fetch
      );
    return internalResponse(
      false,
      Number(fetch.code ?? fetch.statusCode),
      String(fetch.message),
      fetch
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const fetchACollection = async (collectionId: string) => {
  try {
    const aCollection: ResponseDto<ICollectionDto> =
      await init.collection.getById(collectionId);
    if (aCollection.status === Status.ERROR)
      return internalResponse(
        true,
        Number(aCollection.code ?? aCollection.statusCode),
        String(aCollection.message),
        aCollection
      );
    return internalResponse(
      false,
      Number(aCollection.code ?? aCollection.statusCode),
      String(aCollection.message),
      aCollection
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const fetchCollectionTypes = async (filter: filterCollectionDto) => {
  try {
    const types: ResponseDto<FindCollectionTypeDto> =
      await init.collection.getTypes(filter);
    if (types.status === Status.ERROR)
      return internalResponse(
        true,
        Number(types.code ?? types.statusCode),
        String(types.message),
        types
      );
    return internalResponse(
      false,
      Number(types.code ?? types.statusCode),
      String(types.message),
      types
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const updateCollection = async (
  id: string,
  payload: UpdateCollectionDto
) => {
  try {
    const update = await init.collection.updateCollection(id, payload);
    if (update.status === Status.ERROR)
      return internalResponse(
        true,
        Number(update.code ?? update.statusCode),
        String(update.message),
        update
      );
    return internalResponse(
      false,
      Number(update.code ?? update.statusCode),
      String(update.message),
      update
    );
  } catch (error: Error | unknown) {
    return internalResponse(true, 422, String(error), null);
  }
};
