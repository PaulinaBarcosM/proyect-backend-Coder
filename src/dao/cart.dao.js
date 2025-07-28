import CartModel from "../models/cart.model.js";

export default class CartDAO {
  async getAll() {
    return await CartModel.find().populate("products.product");
  }

  async getById(cid) {
    return await CartModel.findById(cid).populate("products.product").lean();
  }

  async createCart(cartData) {
    return await CartModel.create(cartData);
  }

  async updateCart(cid, cartData) {
    return await CartModel.findByIdAndUpdate(cid, cartData);
  }

  async deleteCart(cid) {
    return await CartModel.findByIdAndDelete(cid);
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await CartModel.findById(cid);
    if (!cart) return null;

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === pid
    );
    if (productIndex === -1) return null;

    cart.products[productIndex].quantity = quantity;
    await cart.save();
    return cart.populate("products.product");
  }

  async deleteProduct(cid, pid) {
    const cart = await CartModel.findById(cid);
    if (!cart) return null;

    cart.products = cart.products.filter((p) => p.product.toString() !== pid);
    await cart.save();
    return cart.populate("products.product");
  }

  async clearCart(cid) {
    const cart = await CartModel.findById(cid);
    if (!cart) return null;

    cart.products = [];
    await cart.save();
    return cart.populate("products.product");
  }
}
