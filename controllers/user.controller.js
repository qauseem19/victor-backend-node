const { validationResult } = require("express-validator");
const User = require("../models/user.model");
const { success, error } = require("../utils/responseHelper");

exports.addOrUpdateUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return error(res, "Validation error", 400, errors.array());
  }

  const userId = req.body.id; // Check if ID is provided for update, else it will be new user
  const userData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password, // Include password
  };

  if (userId) {
    // If userId exists, update the user
    User.update(userId, userData, (err, data) => {
      if (err) {
        console.log(err,"error")
        return error(res, "Error occurred while updating the user.", 500,err);
      }
      return success(res, data, "User updated successfully", 200);
    });
  } else {
    // If userId doesn't exist, create a new user
    User.create(userData, (err, data) => {
      if (err) {
        return error(res, "Error occurred while creating the user.", 500,err);
      }
      return success(res, data, "User created successfully", 201);
    });
  }
};



exports.getUsers = (req, res) => {
  User.findAll((err, data) => {
    if (err) {
      return error(res, "Error occurred while fetching users.", 500);
    }
    return success(res, data, "Users fetched successfully", 200);
  });
};


exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return error(res, "User ID is required", 400);
  }

  User.delete(userId, (err, response) => {
    if (err) {
      return error(res, "Error occurred while deleting the user.", 500);
    }
    return success(res, response, "User deleted successfully", 200);
  });
};
