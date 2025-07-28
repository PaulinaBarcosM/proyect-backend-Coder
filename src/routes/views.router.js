import express from "express";
import ProductsService from "../services/product.service.js";
import CartService from "../services/cart.service.js";

const router = express.Router();
const productsService = new ProductsService();
const cartService = new CartService();

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

// ruta para carrito
// vista de  carritos
router.get("/cart/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await cartService.getCartById(id);
    console.log(cart.products);
    if (!cart || !cart.products) {
      return res.status(404).render("error", { message: "Cart not found" });
    }
    res.render("cart", { layout: "main", cart });
  } catch (error) {
    console.error("Error loading cart view:", error);
    res.status(500).send("Error loading cart page");
  }
});

export default router;
