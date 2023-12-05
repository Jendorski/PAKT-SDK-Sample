import { Router } from "express";
import controllerWrapper from "../adaptor";
import PaymentController from "../controller/PaymentController";

const { createOrder, validateOrder, releasePayment, activeRPC } =
  PaymentController;

const router = Router();

router.post("/create", controllerWrapper(createOrder));
router.post("/validate", controllerWrapper(validateOrder));
router.post("/release", controllerWrapper(releasePayment));
router.get("/rpc", controllerWrapper(activeRPC));

export default router;
