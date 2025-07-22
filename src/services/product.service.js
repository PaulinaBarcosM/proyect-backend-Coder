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

  async createProduct(producData) {
    return await this.repository.createProduct(producData);
  }

  async updateProduct(pid, producData) {
    const updated = await this.repository.updateProduct(pid, producData);
    if (!updated) throw new Error("No se encontro el producto para actualizar");
    return updated;
  }

  async deleteProduct(pid) {
    const deleted = await this.repository.deleteProduct(pid);
    if (!deleted) throw new Error("No se encontró el producto para eliminar");
    return deleted;
  }
}
