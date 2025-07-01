import { Router } from "express";
import { validateId } from "../middlewares/middlewares.js";
import { createProduct, getAllProducts, getProductById, modifyProduct, removeProduct } from "../controllers/product.controllers.js";

const router = Router();

//falta get all y .put (update)

//!GET ALL//////////////////
router.get("/", getAllProducts);

//!GET BY ID////////////////
router.get("/:id", validateId,getProductById);

//!POST/////////////////////
router.post("/", createProduct);

//!MODIFY///////////////////
router.put("/", modifyProduct);

//!DELETE///////////////////
router.delete("/:id", removeProduct);

export default router;