export default class CartService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAllCarts() {
    return await this.repository.getAllCarts();
  }

  async getCartById(cid) {
    const cart = await this.repository.getCartById(cid);
    if (!cart) throw new Error("Carrito no encontrado");
    return cart;
  }

  async createCart(cartData) {
    return await this.repository.createCart(cartData);
  }

  async updateCart(cid, cartData) {
    const updated = await this.repository.updateCart(cid, cartData);
    if (!updated) throw new Error("No se pudo actualizar el carrito");
    return updated;
  }

  async deleteCart(cid) {
    const deleted = await this.repository.deleteCart(cid);
    if (!deleted) throw new Error("No se pudo eliminar el carrito");
    return deleted;
  }

  async updateProductQuantity(cid, pid, quantity) {
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error("Cantidad inválida, debe ser entero mayor a 0");
    }
    const updateCart = await this.repository.updateProductQuantity(
      cid,
      pid,
      quantity
    );
    if (!updateCart)
      throw new Error("No se pudo actualizar la cantidad del producto");
    return updateCart;
  }

  async deleteProductFromCart(cid, pid) {
    const updateCart = await this.repository.deleteProductFromCart(cid, pid);
    if (!updateCart)
      throw new Error("No se pudo eliminar el producto del carrito");
    return updateCart;
  }

  async clearCart(cid) {
    const clearedCart = await this.repository.clearCart(cid);
    if (!clearedCart) throw new Error("No se pudo vaciar el carrito");
    return clearedCart;
  }
}
