import express from "express";
import productsRouter from "../src/routes/product.router.js";
import cartsRouter from "../src/routes/cart.router.js";
import viewsRouter from "../src/routes/views.router.js";
import handlebars from "express-handlebars";
import config, { __dirname } from "./config/config.js";
import path from "path";

// helpers personalizados
const hbsHelpers = {
  eq: (a, b) => a === b,
};

const app = express();

app.use(express.json());

app.engine(
  "handlebars",
  handlebars.engine({
    helpers: hbsHelpers,
  })
);

// motor de vistas
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/views", viewsRouter);

app.get("/api/products/ping", (req, res) => {
  res.json({ status: "ok", message: "pong" });
});

export default app;
