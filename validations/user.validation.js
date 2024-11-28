const { body } = require("express-validator");

const userValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").isMobilePhone().withMessage("Valid phone number is required"),
  body("password")
    .optional() // Password is optional for updates
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

module.exports = { userValidationRules };
