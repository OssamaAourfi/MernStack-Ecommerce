const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/productController");

const { isAuthenticateUser, authoriseRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);

router
  .route("/product/new")
  .post(isAuthenticateUser, authoriseRoles("admin"), createProduct);

router
  .route("/product/:id")
  .put(isAuthenticateUser, authoriseRoles("admin"), updateProduct)
  .delete(isAuthenticateUser, authoriseRoles("admin"), deleteProduct)
  .get(getProductDetails);


module.exports = router