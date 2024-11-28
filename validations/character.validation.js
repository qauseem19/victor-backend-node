const { body } = require("express-validator");

exports.characterValidationRules = [
  body("name").notEmpty().withMessage("Name is required"),
//   body("image").notEmpty().withMessage("Image is required"),
  body("prompt").notEmpty().withMessage("Prompt is required"),
];
