import CartModel from "../models/cart.model.js";

export default class CartDAO {
  async getAllCarts() {
    return await CartModel.find();
  }

  async getCartById(cid) {
    return await CartModel.findById(cid).populate({
      path: "products.product",
      select: "title price description stock category thumbnails",
      populate: { path: "category", select: "name" },
    });
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

  async addProduct(cid, pid, quantity = 1) {
    const cart = await CartModel.findById(cid);
    if (!cart) throw new Error("Carrito no encontrado");

    const existingProduct = cart.products.find(
      (item) => item.product.toString() === pid
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }

    return await cart.save();
  }
}
