const express = require("express");
const router = express.Router();
//! middleware
const { authenticateJWT } = require("../middleware/authenticator");
const upload = require("../middleware/multer");
//! controllers
const productController = require("../controllers/product");
//! uload.single : matches with a name attribute of input

router.post("/", authenticateJWT, upload.single("productImage"), productController.create);
router.get("/", productController.readAll);
router.get("/count/:count", productController.readByCount);
router.get("/:productId", productController.read);
router.delete("/:productId", authenticateJWT, productController.delete);
router.post("/:productId", authenticateJWT, upload.single("productImage"), productController.update);

module.exports = router;
