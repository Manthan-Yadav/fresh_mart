const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  createProduct,
  getAllProductsByCategory,
} = require("../controller/product.controller");

router.post("/create", createProduct);
router.get("/get", getAllProducts);
router.get("/get/modify/:id", getAllProductsByCategory);
router.get("/get/:id", getProductById);

module.exports = router;
