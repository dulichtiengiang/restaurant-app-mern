const express = require("express");
const router = express.Router();

//! middleware
const {
    signupValidator,
    signinValidator,
    validatorResult,
} = require("../middleware/validator");

//! Controllers
const { signupController, signinController } = require("../controllers/auth");

router.post("/signup", signupValidator, validatorResult, signupController);
router.post("/signin", signinValidator, validatorResult, signinController);

module.exports = router;
