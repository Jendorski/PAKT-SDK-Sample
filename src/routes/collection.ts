import { Router } from "express";
import controllerWrapper from "../adaptor";
import CollectionController from "../controller/CollectionController";

const { getAll, getACollection } = CollectionController;

const router = Router();

router.post("/");
router.get("/", controllerWrapper(getAll));
router.get("/:id", controllerWrapper(getACollection));
router.post("");
router.post("");
router.post("");
router.post("");
router.post("");
router.post("");

export default router;
