import {
  CreateFileUpload,
  FilterUploadDto,
  FindUploadDto,
  IUploadDto,
  ResponseDto,
  Status,
} from "pakt-sdk";
import { internalResponse } from "../utils";

const TAG = "services/upload";

export const fileUpload = async ({
  authToken,
  file,
}: {
  authToken: string;
  file: any;
}) => {
  try {
    console.log({ theFile: file });
    const filePayload: CreateFileUpload = {
      file,
    };
    const upload: ResponseDto<IUploadDto> = await init.file.fileUpload(
      authToken,
      filePayload
    );
    if (upload.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(upload.message),
        upload
      );
    return internalResponse(false, Number(200), String(upload.message), upload);
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const fetchFileUploads = async (
  authToken: string,
  filter: FilterUploadDto
) => {
  try {
    // const sampleFilter = {
    //   page: "1",
    //   limit: "20",
    // };
    const uploads: ResponseDto<FindUploadDto> = await init.file.getFileUploads(
      authToken
    );
    console.log({ uploads });
    if (uploads.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(uploads.message),
        uploads
      );
    return internalResponse(
      false,
      Number(200),
      String(uploads.message),
      uploads
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const fetchAFileUpload = async (authToken: string, id: string) => {
  try {
    const anUpload = await init.file.getAFileUpload(authToken, id);
    if (anUpload.status === Status.ERROR)
      return internalResponse(
        true,
        Number(422),
        String(anUpload.message),
        anUpload
      );
    return internalResponse(
      false,
      Number(200),
      String(anUpload.message),
      anUpload
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};
