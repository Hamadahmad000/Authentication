const { check, validationResult } = require("express-validator");
const { ValError } = require("../helper/auth-ErrorHelper");

const SignUpValidation = [
  check("name")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be 3 to 20 character longer"),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email address"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be 6 to 20 chatacters longer"),
];
const LoginValidation = [
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email address"),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password must be 6 to 20 chatacters longer"),
];

const authVaildationResult = (req, res, next) => {
  const result = validationResult(req).array();
  if (!result.length) return next();
  const error = result[0].msg;
  res.json({ success: false, message: error });
};

module.exports = { SignUpValidation, authVaildationResult, LoginValidation };
