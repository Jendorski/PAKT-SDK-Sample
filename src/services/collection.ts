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
    /**
     * Creating a sample payload for a Collection.
     * The context for the Collection is for a job, to create a server-side application, the logged in user creating this is the creator.
     * The type is therefore marked as a job.
     *
     * Note that the type can be defined as desired by the creator
     */
    const jobPayload: CreateCollectionDto = {
      type: "job",
      category: "backend",
      name: "Food App Backend Application",
      isPrivate: true,
      description:
        "This Collection is being created to store the details of a job, to develop a backend for a food app",
      tags: ["Node.JS", "Typescript"],
      deliveryDate: "2023-12-12",
      attachments: [], //attachments are the id of the files or documents uploaded with respect to this collection it can be left empty, if no files were uploaded
    };

    /**
     * Another Sample payload for a collection
     * The context for this Collection is to store the record for a football game score
     */
    const footballResultPayload: CreateCollectionDto = {
      type: "football",
      category: "match_report", //there could also be stats as category
      name: "Barcelona vs Real Madrid CF 20-10-2023 Match Report",
      isPrivate: false,
      description:
        "The match report of the El Clasico game between Spanish football giants, Barcelona & Real Madrid CF",
      tags: ["Barcelona", "Real Madrid CF", "El Clasico"],
      deliveryDate: "20-10-2023",
      attachments: ["6108738274389283"], // Sample file upload Id of the game highlights
    };

    /**
     * Another Sample Payload for a Collection
     * The context for this Collection is to store the different types of shoes for a cobbler
     */
    const shoesPayload: CreateCollectionDto = {
      type: "Shoes",
      category: "men_shoes",
      name: "Collection",
      isPrivate: true,
      description: "Collection of Shoes for XYZ Shoes Inc.",
      tags: ["shoes", "slippers", "palm_sandals", "flip_flop"],
    };

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

/**To create many collections, the parent collection id is needed
 *
 */
export const createMany = async ({
  collections,
}: {
  collections: CreateManyCollectionDto;
}) => {
  try {
    /**
     * A sample collections payload, for shoes
     */
    const manyShoesPayload: CreateManyCollectionDto = {
      parent: "6193848473827204048738", //the parent collection id
      type: "Shoes",
      collections: [
        {
          category: "men_shoes",
          tags: ["suede"],
          name: "Suede Shoe A",
          description: "This is suede shoe a, it sells for $500",
          isPrivate: true,
        },
        {
          category: "men_shoes",
          tags: ["flip_flop"],
          name: "Men's Flip Flop",
          description: "This is flip-flop sandal, it costs $200",
          isPrivate: true,
        },
      ],
    };
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
