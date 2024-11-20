const express = require("express");
const productController = require("../controllers/ProductController");
const { authMiddleware } = require("../middlewares/authMiddleWare");

const router = express.Router();

router.post("/create", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/details/:id", productController.getDetailsProduct);
router.put("/:id", authMiddleware, productController.updateProduct);
router.delete("/:id", authMiddleware, productController.deleteProduct);
router.delete("/", authMiddleware, productController.deleteManyProducts);
router.get('/get-all-type', productController.getAllType)

module.exports = router;
