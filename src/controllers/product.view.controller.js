import Product from "../models/product.js";

const getProductsView = async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;
  try {
    let filter = {};
    if (query) filter = { name: new RegExp(query, "i") };

    let sortOption = {};
    if (sort === "asc") sortOption.price = 1;
    else if (sort === "desc") sortOption.price = -1;

    const products = await Product.find(filter)
      .sort(sortOption)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));

    const totalProducts = await Product.countDocuments(filter);

    res.render("products", {
      products,
      page: parseInt(page),
      totalPages: Math.ceil(totalProducts / limit),
      hasPrevPage: page > 1,
      hasNextPage: page * limit < totalProducts,
      prevLink: page > 1 ? `/products?page=${parseInt(page) - 1}` : null,
      nextLink:
        page * limit < totalProducts
          ? `/products?page=${parseInt(page) + 1}`
          : null,
    });
  } catch (error) {
    res.status(500).send("Error al cargar productos");
  }
};

export default { getProductsView };
