import express from "express";
import productsViewController from "../controllers/products.view.controller.js";

const router = express.Router();

router.get("/", productsViewController.getProductsView);

export default router;
