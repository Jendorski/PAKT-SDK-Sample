import { CreateFileUpload, IUploadDto, ResponseDto, Status } from "pakt-sdk";
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
