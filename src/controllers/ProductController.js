const ProductService = require("../services/ProductService");

const createProduct = async (req, res, next) => {
  try {
    const { name, image, type, countInStock, rating, description, discount, selled, price } = req.body;
    if (!name || !image || !type || !countInStock || !rating || !price) {
      return res.status(400).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    if (price < 0 || countInStock < 0 || rating < 0) {
      return res.status(400).json({
        status: "ERR",
        message: "The number fields cannot less than 0",
      });
    }
    const response = await ProductService.createProduct(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(404).json({
      message: error,
    });
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (!id) {
      return res.status(400).json({
        status: "ERR",
        message: "The Id was not defined",
      });
    }

    if (!data) {
      return res.status(400).json({
        status: "ERR",
        message: "The data was not defined",
      });
    }
    const response = await ProductService.updateProduct(id, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const { limit, page, sort, filter } = req.query;
    const response = await ProductService.getAllProducts(Number(limit) || null, Number(page) || 0, sort, filter);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const getDetailsProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        status: "ERR",
        message: "This Product does not exists",
      });
    }
    const response = await ProductService.getDetailsProduct(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({
        status: "ERR",
        message: "The ProductId is required",
      });
    }
    const response = await ProductService.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const deleteManyProducts = async (req, res, next) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(400).json({
        status: "ERR",
        message: "The IDs is not defined",
      });
    }

    const response = await ProductService.deleteManyProducts(ids);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

const getAllType = async (req, res) => {
  try {
    const response = await ProductService.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

module.exports = { createProduct, updateProduct, getAllProducts, getDetailsProduct, deleteProduct, deleteManyProducts, getAllType };
