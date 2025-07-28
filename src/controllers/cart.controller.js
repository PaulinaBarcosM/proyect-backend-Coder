import CartService from "../services/cart.service.js";
import CartRepository from "../repository/cart.repository.js";
import CartDAO from "../dao/cart.dao.js";

const cartsService = new CartService(new CartRepository(new CartDAO()));

// Obtener todos los carritos
const getAllCarts = async (req, res) => {
  try {
    const carts = await cartsService.getAllCarts();
    res.status(200).json({ status: "success", payload: carts });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Obtener carrito por id
const getCartById = async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartsService.getCartById(cid);
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(404).json({ status: "error", error: error.message });
  }
};

// Crear carrito vacío
const createCart = async (req, res) => {
  try {
    const newCart = await cartsService.createCart({ products: [] });
    res.status(201).json({ status: "success", payload: newCart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Actualizar carrito completo (productos)
const updateCart = async (req, res) => {
  try {
    const cid = req.params.cid;
    const products = req.body.products;
    if (!Array.isArray(products)) {
      return res
        .status(400)
        .json({ status: "error", error: "products debe ser un arreglo" });
    }
    const updateCart = await cartsService.updateCart(cid, { products });
    if (!updateCart)
      return res
        .status(404)
        .json({ status: "error", error: "Carrito no encontrado" });
    res.status(200).json({ status: "success", payload: updateCart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

// Eliminar carrito
const deleteCart = async (req, res) => {
  try {
    const cid = req.params.cid;
    const deleted = await cartsService.deleteCart(cid);
    if (!deleted)
      return res
        .status(404)
        .json({ status: "error", error: "Carrito no encontrado" });
    res.status(200).json({ status: "success", message: "Carrito eliminado" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
};

const updateProductQuantity = async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const { quantity } = req.body;
    const updatedCart = await cartsService.updateProductQuantity(
      cid,
      pid,
      quantity
    );
    res.status(200).json({ status: "success", payload: updatedCart });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

const deleteProductFromCart = async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const updatedCart = await cartsService.deleteProductFromCart(cid, pid);
    res.status(200).json({ status: "success", payload: updatedCart });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const cid = req.params.cid;
    const clearedCart = await cartsService.clearCart(cid);
    res.status(200).json({ status: "success", payload: clearedCart });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
};

// Renderizar vista carrito con handlebars
const getCartView = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsService.getCartById(cid);
    res.render("cart", { layout: "main", cart });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error cargando el carrito");
  }
};

export default {
  getAllCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
  updateProductQuantity,
  deleteProductFromCart,
  clearCart,
  getCartView,
};
