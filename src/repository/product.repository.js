import ProductsDAO from "../dao/product.dao.js";

const productsDAO = new ProductsDAO();

export default class ProductsRepository {
  async getProducts(filter, options) {
    return await productsDAO.getAll(filter, options);
  }

  async getProductsPaginated(params) {
    return await productsDAO.getProductsPaginated(params);
  }

  async getProductById(id) {
    return await productsDAO.getById(id);
  }

  async createProduct(productData) {
    return await productsDAO.create(productData);
  }

  async updateProduct(id, productData) {
    return await productsDAO.update(id, productData);
  }

  async deleteProduct(id) {
    return await productsDAO.delete(id);
  }
}
