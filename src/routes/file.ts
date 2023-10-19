import { Router } from "express";
import controllerWrapper from "../adaptor";
import FileUploadController from "../controller/FileUploadController";

const { upload, getUploads, getAFileUpload } = FileUploadController;

const router = Router();

router.post("/upload", controllerWrapper(upload));
router.get("/", controllerWrapper(getUploads));
router.get("/:id", controllerWrapper(getAFileUpload));

export default router;
