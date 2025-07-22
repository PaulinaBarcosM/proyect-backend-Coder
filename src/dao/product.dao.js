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
}
