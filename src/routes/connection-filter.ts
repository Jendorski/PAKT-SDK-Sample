import Router from "express";
import controllerWrapper from "../adaptor";
import ConnectionFilterController from "../controller/ConnectionFilterController";

const { create, update, get } = ConnectionFilterController;
const router = Router();

router.post("/", controllerWrapper(create));
router.put("/update", controllerWrapper(update));
router.get("/", controllerWrapper(get));

export default router;
