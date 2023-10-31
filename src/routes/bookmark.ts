import { Router } from "express";
import controllerWrapper from "../adaptor";
import BookmarkController from "../controller/BookmarkController";

const { create, getAll, getById } = BookmarkController;

const router = Router();

router.post("/", controllerWrapper(create));
router.get("/", controllerWrapper(getAll));
router.get("/:id", controllerWrapper(getById));

export default router;
