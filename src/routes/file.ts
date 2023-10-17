import { Router } from "express";
import controllerWrapper from "../adaptor";
import FileUploadController from "../controller/FileUploadController";

const { upload } = FileUploadController;

const router = Router();

router.post("/upload", controllerWrapper(upload));

export default router;
