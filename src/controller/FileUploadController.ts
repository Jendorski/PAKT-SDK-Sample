import { Request, Response } from "express";
import { fileUpload } from "../services/upload";

const FileUploadController = {
  upload: async (req: Request, res: Response) => {
    console.log({ file: { ...req.body } });
    const resp = await fileUpload({
      filePayload: {
        file: req.body.file,
      },
    });
  },
};
export default FileUploadController;
