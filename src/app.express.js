import express from "express";
import productsRouter from "../src/routes/product.router.js";
import cartsRouter from "../src/routes/cart.router.js";
import productsViewRouter from "../src/routes/product.view.router.js";

const app = express();

app.use(express.json());

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/products", productsViewRouter);

app.get("/api/products/ping", (req, res) => {
  res.json({ status: "ok", message: "pong" });
});

export default app;
