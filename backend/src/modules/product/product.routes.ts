import { Router } from "express";
import * as controller from "./product.controller";

const router = Router();

router.get("/", controller.getAll)
router.post("/", controller.create)
router.put("/:id", controller.update)
router.delete("/:id", controller.deleteProduct)

export default router;
