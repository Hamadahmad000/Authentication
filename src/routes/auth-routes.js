const { Router } = require("express");
const { HandleSignup, HandleLogin } = require("../controllers/auth-controller");
const {
  SignUpValidation,
  authVaildationResult,
  LoginValidation,
} = require("../middleware/auth-validation");
const auth = Router();

auth.post("/signup", SignUpValidation, authVaildationResult, HandleSignup);
auth.post("/login", LoginValidation, authVaildationResult, HandleLogin);

module.exports = auth;
