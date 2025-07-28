import express from "express";
import productsRouter from "../src/routes/product.router.js";
import cartsRouter from "../src/routes/cart.router.js";
import viewsRouter from "../src/routes/views.router.js";
import handlebars from "express-handlebars";
import path from "path";
import config, { __dirname } from "./config/config.js";
import productController from "../src/controllers/product.controller.js";

// helpers personalizados para handlebars
const hbsHelpers = {
  eq: (a, b) => a === b,
};

const app = express();

app.use(express.json());

// Configurar motor de vistas Handlebars con helpers
app.engine(
  "handlebars",
  handlebars.engine({
    helpers: hbsHelpers,
  })
);

// motor de vistas
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "..", "views"));

// Rutas API
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/views", viewsRouter);

app.get("/", productController.getHomeView);

// Middleware para manejar rutas no encontradas
app.use((req, res) => {
  console.log(`Ruta no encontrada: ${req.method} ${req.url}`);
  res.status(404).render("notFound", { layout: "main" });
});

app.get("/api/products/ping", (req, res) => {
  res.json({ status: "ok", message: "pong" });
});

export default app;
