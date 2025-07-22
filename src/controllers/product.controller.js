import ProductsService from "../services/product.service.js";

const productsService = new ProductsService();

const getProducts = async (req, res, next) => {
  try {
    const { limit, page, sort, query } = req.query;
    const result = await productsService.getProducts({
      limit: Number(limit),
      page: Number(page),
      sort,
      query,
    });
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const result = await productsService.getProductById(pid);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

//
const createProduct = async (req, res, next) => {
  try {
    const product = req.body;
    const result = await productsService.createProduct(product);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const productData = req.body;
    const result = await productsService.updateProduct(pid, productData);
    res.send(result);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const result = await productsService.deleteProduct(pid);
    res.send({ status: "success", deleted: result });
  } catch (error) {
    next(error);
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
