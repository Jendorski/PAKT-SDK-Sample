import { Request, Response } from "express";
import {
  fetchAFileUpload,
  fetchFileUploads,
  fileUpload,
} from "../services/upload";
import Utils from "../utils/response";

const { failed, success } = Utils;

const FileUploadController = {
  upload: async (req: Request, res: Response) => {
    console.log({ file: { ...req.body } });
    console.log({ req: req.file });
    console.log({ req: req.files });
    console.log({ req: Object.values(req.files || [])[0] });
    const files = req.files;
    const resp = await fileUpload({
      file: Object.values(files || [])[0],
    });
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  getUploads: async (req: Request, res: Response) => {
    const resp = await fetchFileUploads({ ...req.query });
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  getAFileUpload: async (req: Request, res: Response) => {
    const id = req.params.id;
    const resp = await fetchAFileUpload(id);
    return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
};
export default FileUploadController;
