const Product = require("../model/products");
const mongoose = require("mongoose");

async function getAllProductsByCategory(req, res) {
  try {
    const { id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    const products = await Product.find({ category_id: id });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found for this category" });
    }

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function createProduct(req, res) {
  try {
    const { category_id, name, brand, price, description, image, stock } =
      req.body;

    if (!category_id || !name || !brand || !price || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = await Product.create({
      category_id,
      name,
      brand,
      price,
      description,
      image,
      stock,
    });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getAllProducts(req, res) {
  try {
    const products = await Product.find();

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  getAllProductsByCategory,
};
