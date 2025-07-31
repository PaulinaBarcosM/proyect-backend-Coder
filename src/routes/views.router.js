import express from "express";
import ProductsService from "../services/product.service.js";
import CartModel from "../models/cart.model.js";

const router = express.Router();
const productsService = new ProductsService();

// vista de  carritos
router.get("/cart", async (req, res) => {
  try {
    const cart = await CartModel.findOne();

    if (!cart) {
      return res
        .status(404)
        .render("error", { message: "No hay carritos disponibles" });
    }

    res.redirect(`/views/cart/${cart._id}`);
  } catch (error) {
    console.error("Error al redirigir al carrito:", error);
    res.status(500).send("Error al cargar el carrito");
  }
});

router.get("/cart/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartModel.findById(cid).populate("products.product");
    if (!cart) {
      return res.status(404).render("error", { message: "Cart not found" });
    }
    res.render("cart", { layout: "main", cart });
  } catch (error) {
    console.error("Error loading cart view:", error);
    res.status(500).send("Error interno del servidor: loading cart view");
  }
});

// Vista paginada de prodcutos con filtros y paginación
router.get("/products/view", async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const result = await productsService.getProducts({
      limit: Number(limit),
      page: Number(page),
      sort,
      query,
    });
    res.render("products", {
      title: "Lista de Productos",
      products: result.payload,
      pagination: {
        totalPages: result.totalPages,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        prevLink: result.prevLink,
        nextLink: result.nextLink,
      },
    });
  } catch (err) {
    res.status(500).send("Error al cargar productos");
  }
});

// Vista de detalles de un producto por id
router.get("/products/details/:id", async (req, res) => {
  try {
    const product = await productsService.getProductById(req.params.id);
    if (!product)
      return res
        .status(404)
        .render("error", { message: "Producto no encontrado" });

    res.render("productDetails", {
      layout: "main",
      product,
      cartId: "64faaaec7f121b00e0d302a1",
    });
  } catch (error) {
    console.error("Error al cargar los detalles del producto:", error);
    res.status(500).send("Error al cargar la página de detalles del producto");
  }
});

// Editar producto - mostrar formulario con datos actuales
router.get("/products/update/:id", async (req, res) => {
  try {
    const product = await productsService.getProductById(req.params.id);
    if (!product)
      return res
        .status(404)
        .render("error", { message: "Producto no encontrado" });

    res.render("editProduct", { layout: "main", product });
  } catch (error) {
    console.error("Error al cargar la página de edición del producto:", error);
    res.status(500).send("Error al cargar la página de edición del producto");
  }
});

// Editar producto - procesar formulario
router.post("/products/update/:id", async (req, res) => {
  try {
    const updatedData = req.body;
    await productsService.updateProduct(req.params.id, updatedData);
    res.redirect(`/views/products/details/${req.params.id}?success=2`);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).send("Error al actualizar el producto");
  }
});

// Eliminar producto
router.post("/products/delete/:id", async (req, res) => {
  try {
    await productsService.deleteProduct(req.params.id);
    res.redirect("/views/products/view");
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).send("Error al eliminar el producto");
  }
});

export default router;
