import { Request, Response } from "express";
import {
  fetchAFileUpload,
  fetchFileUploads,
  fileUpload,
} from "../services/upload";
import { removeString } from "../utils/helper";
import Utils from "../utils/response";

const { failed, success } = Utils;

const FileUploadController = {
  upload: async (req: Request, res: Response) => {
    console.log({ file: { ...req.body } });
    console.log({ req: req.file });
    console.log({ req: req.files });
    console.log({ req: Object.values(req.files || [])[0] });
    const auth = removeString(String(req.headers.authorization), "Bearer ");
    const files = req.files;
    const resp = await fileUpload({
      file: Object.values(files || [])[0],
      authToken: String(auth),
    });
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  getUploads: async (req: Request, res: Response) => {
    const auth = removeString(String(req.headers.authorization), "Bearer ");
    console.log({ auth });
    const resp = await fetchFileUploads(String(auth), { ...req.query });
    if (resp?.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
  getAFileUpload: async (req: Request, res: Response) => {
    const id = req.params.id;
    const auth = removeString(String(req.headers.authorization), "Bearer ");
    const resp = await fetchAFileUpload(String(auth), id);
    if (resp.error)
      return failed(res, resp.data, resp.message, resp.statusCode);
    return success(res, resp.data, resp.message, resp.statusCode);
  },
};
export default FileUploadController;
