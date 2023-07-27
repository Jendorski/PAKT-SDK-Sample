import {
  CreateCollectionDto,
  CreateManyCollectionDto,
  FindCollectionDto,
  FindCollectionTypeDto,
  ICollectionDto,
  ResponseDto,
  Status,
  filterCollectionDto,
} from "pakt-sdk";

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
    if (create.status === Status.ERROR) return null;
    return create.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
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
    if (many.status === Status.ERROR) return null;
    return many.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
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
    if (fetch.status === Status.ERROR) return null;
    return fetch.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};

export const fetchACollection = async (collectionId: string) => {
  try {
    const aCollection: ResponseDto<ICollectionDto> =
      await init.collection.getById(collectionId);
    if (aCollection.status === Status.ERROR) return null;
    return aCollection.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};

export const fetchCollectionTypes = async (filter: filterCollectionDto) => {
  try {
    const types: ResponseDto<FindCollectionTypeDto> =
      await init.collection.getTypes(filter);
    if (types.status === Status.ERROR) return null;
    return types.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};
