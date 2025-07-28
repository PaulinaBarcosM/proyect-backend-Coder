import ProductModel from "../models/product.model.js";

export default class ProductsDAO {
  async getAll(params = {}, options = {}) {
    return await ProductModel.paginate(params, options);
  }

  async getById(id) {
    return await ProductModel.findById(id);
  }

  async create(product) {
    return await ProductModel.create(product);
  }

  async update(id, productData) {
    return await ProductModel.findByIdAndUpdate(id, productData, { new: true });
  }

  async delete(id) {
    return await ProductModel.findByIdAndDelete(id);
  }

  // Método paginado con filtros específicos
  async getPaginated({ limit = 10, page = 1, sort, category, status }) {
    const query = {};
    if (category) query.category = category;
    if (status) query.status = status;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort ? { price: sort === "asc" ? 1 : -1 } : undefined,
    };

    return await ProductModel.paginate(query, options);
  }
}
