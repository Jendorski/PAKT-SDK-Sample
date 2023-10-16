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
  filePayload,
}: {
  filePayload: CreateFileUpload;
}) => {
  try {
    const upload: ResponseDto<IUploadDto> = await init.file.fileUpload(
      filePayload
    );
    if (upload.status === Status.ERROR)
      return internalResponse(
        true,
        Number(upload.code ?? upload.statusCode),
        String(upload.message),
        upload
      );
    return internalResponse(
      false,
      Number(upload.code ?? upload.statusCode),
      String(upload.message),
      upload
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const fetchFileUploads = async (filter: FilterUploadDto) => {
  try {
    // const sampleFilter = {
    //   page: "1",
    //   limit: "20",
    // };
    const uploads: ResponseDto<FindUploadDto> = await init.file.getFileUploads(
      filter
    );
    if (uploads.status === Status.ERROR)
      return internalResponse(
        true,
        Number(uploads.code ?? uploads.statusCode),
        String(uploads.message),
        uploads
      );
    return internalResponse(
      false,
      Number(uploads.code ?? uploads.statusCode),
      String(uploads.message),
      uploads
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};

export const fetchAFileUpload = async (id: string) => {
  try {
    const anUpload = await init.file.getAFileUpload(id);
    if (anUpload.status === Status.ERROR)
      return internalResponse(
        true,
        Number(anUpload.code ?? anUpload.statusCode),
        String(anUpload.message),
        anUpload
      );
    return internalResponse(
      false,
      Number(anUpload.code ?? anUpload.statusCode),
      String(anUpload.message),
      anUpload
    );
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return internalResponse(true, 422, String(error), null);
  }
};
