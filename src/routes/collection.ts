import { Router } from "express";
import controllerWrapper from "../adaptor";
import CollectionController from "../controller/CollectionController";

const {
  getAll,
  getACollection,
  deleteACollection,
  create,
  createMany,
  update,
} = CollectionController;

const router = Router();

router.post("/create", controllerWrapper(create));
router.post("/many", controllerWrapper(createMany));
router.patch("/:id", controllerWrapper(update));
router.get("/", controllerWrapper(getAll));
router.get("/:id", controllerWrapper(getACollection));
router.delete("/:id", controllerWrapper(deleteACollection));

export default router;
