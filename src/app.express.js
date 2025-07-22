import express from "express";
import productsRouter from "../src/routes/product.router.js";

const app = express();

app.use(express.json());

app.use("/api/products", productsRouter);

app.get("/api/products/ping", (req, res) => {
  res.json({ status: "ok", message: "pong" });
});

export default app;
