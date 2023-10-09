import {
  CreateCollectionDto,
  CreateManyCollectionDto,
  FindCollectionDto,
  FindCollectionTypeDto,
  ICollectionDto,
  ResponseDto,
  Status,
  UpdateCollectionDto,
  UpdateManyCollectionsDto,
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
     * Note that the type can be fetched from init.collection.getTypes(filter);
     */
    const jobPayload: CreateCollectionDto = {
      type: "job", //fetched from the init.collection.getTypes(filter);
      category: "backend",
      name: "Food App Backend Application",
      isPrivate: true,
      description:
        "This Collection is being created to store the details of a job, to develop a backend for a food app",
      tags: ["Node.JS", "Typescript"],
      deliveryDate: "2023-12-03T16:58:16.000Z",
      attachments: [], //attachments are the id of the files or documents uploaded with respect to this collection it can be left empty, if no files were uploaded
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

/**This feature is used to get the available collection types */
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
    const samplePayload: UpdateCollectionDto = {
      type: "job",
      name: "Sample Update",
      description: "This is a sample update of a collection",
      isPrivate: false,
      category: "sample_update",
      deliveryDate: "2023-11-17T12:53:40.718Z",
      tags: ["tag_one", "tag_two"],
      //deliverables: ["update one", "update two"],
      parent: "650026e1f4542241c4f6fe11", //if the collection is part of a parent, then the id of the collection
      image: "https://file_uploaded_image_url",
      status: "ongoing", //or anyone based on the ICollectionStatus,
      attachments: ["123456789098765", "09876543456789087"],
    };
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

export const deleteCollection = async (collectionId: string) => {
  try {
    const deleted = await init.collection.deleteACollection(collectionId);
    if (deleted.status === Status.ERROR)
      return internalResponse(
        true,
        Number(deleted.code ?? deleted.statusCode),
        String(deleted.message),
        deleted
      );
    return internalResponse(
      false,
      Number(deleted.code ?? deleted.statusCode),
      String(deleted.message),
      deleted
    );
  } catch (error: Error | unknown) {
    console.log({ error });
    return internalResponse(true, 422, String(error), null);
  }
};

export const updateManyCollections = async (
  collections: UpdateManyCollectionsDto
) => {
  try {
    const sampleUpdateManyCollections: UpdateManyCollectionsDto = {
      collections: [
        {
          id: "",
          name: "First Collection to be updated",
          description: "Description of the first collection",
          tags: ["first_tag"],
          type: "job", //or any from any of the collection types
          attachments: ["_id of the file uploaded"],
          deliveryDate: "2023-10-10",
          status: "completed",
          parent: "_id of the collection thats the parent",
        },
        {
          id: "",
          name: "Second Collection to be updated",
          description: "Description of the second collection",
          tags: ["second_tag"],
          type: "job", //or any from any of the collection types
          attachments: ["_id of the file uploaded"],
          deliveryDate: "2023-10-11",
          status: "completed",
        },
      ],
    };
    const updatedMany = await init.collection.updateManyCollections(
      collections
    );
    if (updatedMany.status === Status.ERROR)
      return internalResponse(
        true,
        Number(updatedMany.code ?? updatedMany.statusCode),
        String(updatedMany.message),
        updatedMany
      );
    return internalResponse(
      false,
      Number(updatedMany.code ?? updatedMany.statusCode),
      String(updatedMany.message),
      updatedMany
    );
  } catch (error: Error | unknown) {
    return internalResponse(true, 422, String(error), null);
  }
};
