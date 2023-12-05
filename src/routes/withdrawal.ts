import { Router } from "express";
import controllerWrapper from "../adaptor";
import PaymentController from "../controller/WithdrawalController";

const { create, getRecords } = PaymentController;

const router = Router();

router.post("/", controllerWrapper(create));
router.get("/rpc", controllerWrapper(getRecords));

export default router;
