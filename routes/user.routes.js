const express = require("express");
const router = express.Router();
const { addOrUpdateUser, getUsers, deleteUser } = require("../controllers/user.controller");
const { userValidationRules } = require("../validations/user.validation");

router.post("/user", userValidationRules, addOrUpdateUser);  // Create or Update user
router.get("/users", getUsers);  // Get all users
router.delete("/user/:id", deleteUser);  // Delete user

module.exports = router;
