import { Router } from "express";
import controllerWrapper from "../adaptor";
import AccountController from "../controller/AccountController";

const router = Router();
const { fetchUsers, fetchAUser, updateAnAccount, fetchUser } =
  AccountController;

router.get("/", controllerWrapper(fetchUsers));
router.get("/:id", controllerWrapper(fetchAUser));
router.get("/user", controllerWrapper(fetchUser));
router.post("/", controllerWrapper(updateAnAccount));

export default router;
