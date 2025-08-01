import ProductsService from "../services/product.service.js";

const productsService = new ProductsService();

const getProducts = async (req, res, next) => {
  try {
    const { limit, page, sort, query } = req.query;
    const result = await productsService.getProducts({
      limit: Number(limit),
      page: Number(page),
      sort,
      query,
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
};

//busco un producto por ID
const getProductById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const result = await productsService.getProductById(pid);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

//creo un producto
const createProduct = async (req, res, next) => {
  try {
    const product = req.body;
    const result = await productsService.createProduct(product);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

//actualizo un producto
const updateProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const productData = req.body;
    const result = await productsService.updateProduct(pid, productData);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

//elimino un producto
const deleteProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const result = await productsService.deleteProduct(pid);
    res.send({ status: "success", deleted: result });
  } catch (error) {
    next(error);
  }
};

// SEED
const seedProducts = async (req, res) => {
  try {
    const products = [
      {
        title: "Campera de Cuero Negra",
        price: 89999,
        description:
          "Campera entallada de cuero legítimo con cierre y bolsillos laterales. Ideal para días frescos.",
        code: "R001",
        status: "available",
        stock: 50,
        category: "ropa",
        thumbnails: ["/img/campera1.webp", "/img/campera2.webp"],
      },
      {
        title: "Jean Mom Azul",
        price: 45999,
        description:
          "Jean corte mom tiro alto, denim azul lavado, con bolsillos y cierre frontal.",
        code: "R002",
        status: "available",
        stock: 70,
        category: "ropa",
        thumbnails: ["/img/jean1.webp", "/img/jean2.webp"],
      },
      {
        title: "Remera Oversize Blanca",
        price: 18999,
        description:
          "Remera de algodón 100% blanca con corte oversize y cuello redondo.",
        code: "R003",
        status: "available",
        stock: 120,
        category: "ropa",
        thumbnails: ["/img/remera1.webp", "/img/remera2.webp"],
      },
      {
        title: "Vestido Largo Floral",
        price: 62999,
        description:
          "Vestido largo con estampado floral y breteles finos, ideal para primavera-verano.",
        code: "R004",
        status: "available",
        stock: 40,
        category: "ropa",
        thumbnails: ["/img/vestido1.webp", "/img/vestido2.webp"],
      },
      {
        title: "Zapatillas Urbanas Negras",
        price: 74999,
        description:
          "Zapatillas de lona negra con suela de goma. Combinan con cualquier outfit casual.",
        code: "R005",
        status: "available",
        stock: 85,
        category: "ropa",
        thumbnails: ["/img/zapatillas1.webp", "/img/zapatillas2.webp"],
      },
      {
        title: "Buzo Unisex Beige",
        price: 52999,
        description:
          "Buzo oversize unisex de frisa con capucha y bolsillo canguro.",
        code: "R006",
        status: "available",
        stock: 60,
        category: "ropa",
        thumbnails: ["/img/buzo1.webp", "/img/buzo2.webp"],
      },
    ];

    await productsService.insertMany(products);
    res.status(201).json({ message: "Productos agregados con éxito" });
  } catch (error) {
    console.error("Error al insertar productos:", error);
    res.status(500).json({ error: "Error al insertar productos" });
  }
};

// VIEWS
const getHomeView = async (req, res) => {
  try {
    const { limit, page, sort, query } = req.query;

    const {
      payload: products,
      totalPages,
      prevPage,
      nextPage,
      page: currentPage,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    } = await productsService.getProducts({ limit, page, sort, query });

    res.render("home", {
      title: "Home | Productos",
      products,
      totalPages,
      prevPage,
      nextPage,
      currentPage,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink,
    });
  } catch (error) {
    req.logger.error("Error al obtener productos:", error);
    res.status(500).send("Error interno del servidor");
  }
};

const getProductDetailsView = async (req, res) => {
  try {
    const product = await productsService.findById(req.params.id);
    if (!product) {
      return res
        .status(400)
        .render("error", { message: "Producto no econtrado" });
    }
    res.render("productDetails", { layout: "main", product });
  } catch (error) {
    console.error("Error al mostrar los detalles del producto:", error);
    res.status(500).send("Error al cargar la página de detalles del producto");
  }
};

const updateProductView = async (req, res) => {
  try {
    const { pid } = req.params;
    const updateFields = req.body;

    if (Object.keys(updateFields).length === 0) {
      return res
        .status(400)
        .send("No hay campos proporcionados para actualizar.");
    }

    const updatedProduct = await productsService.findByIdAndUpdate(
      pid,
      updateFields,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).send("Producto no encontrado.");
    }
    res.redirect(`/products/details/${pid}?success=2`);
  } catch (error) {
    console.log("Error al actualizar el producto:", error);
    res.status(500).send("Error al actualizar el producto");
  }
};

const deleteProductView = async (req, res) => {
  try {
    const { pid } = req.params;
    const deletedProduct = await productsService.findByIdAndDelete(pid);
    if (!deletedProduct) {
      return res.status(404).send("Producto no encontrado.");
    }
    res.redirect("/products/view");
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).send("Error al eliminar el producto.");
  }
};

const updateProductImage = async (id, imagePath) => {
  try {
    const product = await productsService.findById(pid);
    if (!product) return null;

    if (!Array.isArray(product.thumbnails)) {
      product.thumbnails = [];
    }

    product.thumbnails.push(imagePath);
    await product.save();

    return product;
  } catch (error) {
    console.error("Error al actualizar la imagen del producto:", error);
    return null;
  }
};

const uploadProductImage = async (req, res) => {
  try {
    const { pid } = req.params;
    if (!req.file) {
      return res.status(400).send("No se ha subido ninguna imagen");
    }

    const imagePath = `/img/${req.file.filename}`;
    const product = await updateProductImage(pid, imagePath);

    if (!product) {
      return res.status(404).send("Producto no encontrado.");
    }

    res.redirect(`/products/details/${pid}?success=1`);
  } catch (error) {
    console.error("Error al cargar la imagen del producto:", error);
    res.status(500).send("Error al subir la imagen");
  }
};

// UTILS
const parseFilters = (req) => {
  let filter = {};

  if (req.query.query) {
    const queryParts = req.query.query.split(":");
    if (queryParts.length === 2) {
      const [key, value] = queryParts;
      filter[key] = key === "status" ? value : { $regex: value, $options: "i" };
    }
  }

  if (req.query.availability === "available") {
    filter.stock = { $gt: 0 };
  } else if (req.query.availability === "unavailable") {
    filter.stock = 0;
  }

  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};
    if (req.query.minPrice) filter.price.$gte = parseFloat(req.query.minPrice);
    if (req.query.maxPrice) filter.price.$lte = parseFloat(req.query.maxPrice);
  }

  return filter;
};

// Función auxiliar para construir las opciones de paginación
const getPaginationOptions = (req) => ({
  page: parseInt(req.query.page) || 1,
  limit: parseInt(req.query.limit) || 10,
  sort:
    req.query.sort === "asc" || req.query.sort === "desc"
      ? { price: req.query.sort === "asc" ? 1 : -1 }
      : undefined,
});

//vista con paginación y filtros
const getProductsView = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort || null;
    const query = req.query.query || null;

    const result = await productsService.getProducts({
      page,
      limit,
      sort,
      query,
    });

    res.render("products", {
      products: result.docs,
      pagination: {
        totalPages: result.totalPages,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        prevLink: result.hasPrevPage
          ? `/products?page=${result.prevPage}`
          : null,
        nextLink: result.hasNextPage
          ? `/products?page=${result.nextPage}`
          : null,
      },
    });
  } catch (error) {
    console.error("Error al cargar la vista de productos:", error);
    res.status(500).send("Error interno al cargar productos.");
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  seedProducts,
  getHomeView,
  getProductDetailsView,
  updateProductView,
  deleteProductView,
  updateProductImage,
  uploadProductImage,
  parseFilters,
  getPaginationOptions,
  getProductsView,
};
