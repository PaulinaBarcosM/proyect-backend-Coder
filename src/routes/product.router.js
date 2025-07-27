import express from "express";
import productsController from "../controllers/product.controller.js";

const router = express.Router();

// Rutas API (JSON)
router.get("/", productsController.getProducts);
router.get("/:pid", productsController.getProductById);
router.post("/", productsController.createProduct);
router.put("/:pid", productsController.updateProduct);
router.delete("/:pid", productsController.deleteProduct);

// Seed
router.post("/seed", productsController.seedProducts);

export default router;
