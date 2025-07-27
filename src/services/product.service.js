import ProductsRepository from "../repository/product.repository.js";

export default class ProductsService {
  constructor() {
    this.repository = new ProductsRepository();
  }

  async getProducts({ limit = 10, page = 1, sort, query }) {
    const filter = {};

    //filtro por categoria o disponibilidad
    if (query) {
      filter.$or = [
        { category: { $regex: query, $options: "i" } },
        { status: { $regex: query, $options: "i" } },
      ];
    }

    //opciones de paginación y ordenamiento
    const options = {
      limit,
      page,
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : undefined,
      lean: true,
    };

    const result = await this.repository.getProducts(filter, options);

    // Formateo para la respuesta con links (estilo consigna)
    return {
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `/api/products?page=${result.prevPage}&limit=${limit}`
        : null,
      nextLink: result.hasNextPage
        ? `/api/products?page=${result.nextPage}&limit=${limit}`
        : null,
    };
  }

  async getProductById(pid) {
    const product = await this.repository.getProductById(pid);
    if (!product) throw new Error("Producto no encontrado");
    return product;
  }

  async createProduct(productData) {
    //que no falten campos importantes para crear productos
    const requieredField = [
      "title",
      "description",
      "price",
      "code",
      "stock",
      "category",
    ];

    const missingFields = requieredField.filter((field) => !productData[field]);

    if (missingFields.length > 0) {
      throw new Error(
        `Faltan campos obligatorios: ${missingFields.join(", ")}`
      );
    }

    if (typeof productData.price !== "number" || productData.price < 0) {
      throw new Error("El precio debe ser un número válido y positivo");
    }

    if (!Number.isInteger(productData.stock) || productData.stock < 0) {
      throw new Error("El stock deber ser un número entero positivo");
    }

    return await this.repository.createProduct(productData);
  }

  async updateProduct(pid, productData) {
    if (
      productData.price !== undefined &&
      (typeof productData.price !== "number" || productData.price < 0)
    ) {
      throw new Error("El precio debe ser un número válido y positivo");
    }

    if (
      productData.stock !== undefined &&
      (!Number.isInteger(productData.stock) || productData.stock < 0)
    ) {
      throw new Error("El stock debe ser un número entero positivo");
    }

    const updated = await this.repository.updateProduct(pid, productData);
    if (!updated) throw new Error("No se encontro el producto para actualizar");
    return updated;
  }

  async deleteProduct(pid) {
    const deleted = await this.repository.deleteProduct(pid);
    if (!deleted) throw new Error("No se encontró el producto para eliminar");
    return deleted;
  }
}
