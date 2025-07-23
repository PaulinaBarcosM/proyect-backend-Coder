import express from "express";
import cartController from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", cartController.getAllCarts);
router.get("/:cid", cartController.getCartById);
router.post("/", cartController.createCart);
router.put("/:cid", cartController.updateCart);
router.delete("/:cid", cartController.deleteCart);

router.put("/:cid/products/:pid", cartController.updateProductQuantity);
router.delete("/:cid/products/:pid", cartController.deleteProductFromCart);
router.delete("/:cid/products", cartController.clearCart);

export default router;
