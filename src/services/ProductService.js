const Product = require("../models/ProductModel");

const createProduct = (newProduct) => {
  return new Promise(async (resolve, reject) => {
    const { name, image, type, countInStock, rating, description, discount, selled, price } = newProduct;
    try {
      const checkProduct = await Product.findOne({
        name: name,
      });
      if (checkProduct !== null) {
        resolve({
          status: "OK",
          message: "The name is already existed",
        });
      }

      const createProduct = await Product.create({
        name,
        image,
        type,
        countInStock: Number(countInStock),
        rating,
        description,
        discount: Number(discount),
        selled,
        price,
      });
      if (createProduct) {
        resolve({
          status: "OK",
          message: "SUCCESS",
          data: createProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const getAllProducts = (limit, page, sort, filter) => {
  return new Promise(async (resolve, reject) => {
    try {
      let products = [];
      let filterCond = {};
      let limitCond = 0;
      let sortCond = { createdAt: -1, updatedAt: -1 };

      if (filter) {
        const label = filter[0];
        filterCond = { [label]: { $regex: filter[1] } };
      }
      if (sort) {
        const ObjectSort = { [sort[1]]: sort[0] };
        sortCond = { ...ObjectSort, ...sortCond };
      }

      if (limit) {
        limitCond = limit;
      }

      products = await Product.find(filterCond)
        .limit(limitCond)
        .skip(page * limitCond)
        .sort(sortCond);

      const totalProducts = products.length;
      resolve({
        status: "OK",
        data: products,
        total: totalProducts,
        pageCurrent: page + 1,
        totalPage: limitCond ? Math.ceil(totalProducts / limitCond) : 1,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const productInfo = await Product.findOne({ _id: id });
      if (!productInfo) {
        resolve({
          status: "ERR",
          message: "The product is not definded",
        });
      }

      await Product.findByIdAndDelete(id);
      resolve({
        status: "OK",
        message: "Delete product success",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteManyProducts = (productIds) => {
  return new Promise(async (resolve, reject) => {
    try {
      await Product.deleteMany({ _id: productIds });
      resolve({
        status: "OK",
        message: "Delete many products success",
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getDetailsProduct = (productId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const productInfo = await Product.findOne({ _id: productId });
      if (!productInfo) {
        resolve({
          status: "ERR",
          message: "The product does not exists",
        });
      }
      resolve({
        status: "OK",
        data: productInfo,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateProduct = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const productInfo = await Product.findOne({ _id: id });
      if (!productInfo) {
        resolve({
          status: "ERR",
          message: "The product does not exists",
        });
      }

      const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

      resolve({
        status: "OK",
        message: "Update is successed",
        data: updatedProduct,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllType = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allType = await Product.distinct("type");
      resolve({
        status: "OK",
        message: "Success",
        data: allType,
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  deleteManyProducts,
  getDetailsProduct,
  updateProduct,
  getAllType,
};
