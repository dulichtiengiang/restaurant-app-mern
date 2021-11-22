const express = require("express");
const router = express.Router();
//! middlewares
const { authenticateJWT } = require("../middleware/authenticator");
//! Controllers
const categoryController = require("../controllers/category");

//! CRUD Create Read Update Delete
router.post("/", authenticateJWT, categoryController.create);
router.get("/", categoryController.readAll);
router.delete("/:categoryId", categoryController.delete);

module.exports = router;
