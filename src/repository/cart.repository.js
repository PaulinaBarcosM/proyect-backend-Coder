import CartDAO from "../dao/cart.dao.js";

const cartDAO = new CartDAO();

export default class CartRepository {
  async getAllCarts() {
    return await cartDAO.getAll();
  }

  async getCartById(cid) {
    return await cartDAO.getById(cid);
  }

  async createCart(cartData) {
    return await cartDAO.createCart(cartData);
  }

  async updateCart(cid, cartData) {
    return await cartDAO.updateCart(cid, cartData);
  }

  async deleteCart(cid) {
    return await cartDAO.deleteCart(cid);
  }

  async updateProductQuantity(cid, pid, quantity) {
    return await cartDAO.updateProductQuantity(cid, pid, quantity);
  }

  async deleteProductFromCart(cid, pid) {
    return await cartDAO.deleteProduct(cid, pid);
  }

  async clearCart(cid) {
    return await cartDAO.clearCart(cid);
  }
}
