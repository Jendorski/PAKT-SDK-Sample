import { CreateFileUpload, IUploadDto, ResponseDto, Status } from "pakt-sdk";

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
    if (upload.status === Status.ERROR) return null;
    return upload.data;
  } catch (error: Error | unknown) {
    console.error(`${TAG}::${String(error)}`);
    return null;
  }
};
