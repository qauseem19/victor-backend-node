// controllers/character.controller.js
const path = require("path");
const fs = require("fs");
const { validationResult } = require("express-validator");
const Character = require("../models/character.model");
const { success, error } = require("../utils/responseHelper");

exports.addCharacter = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return error(res, "Validation error", 400, errors.array());
  }

  if (!req.file) {
    return error(res, "Image file is required", 400);
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  const newCharacter = {
    name: req.body.name,
    image: imageUrl,
    prompt: req.body.prompt,
  };

  Character.create(newCharacter, (error, data) => {
    if (error) {
      return error(res, "Error occurred while creating the character.", 500);
    }
    return success(res, data, "Character created successfully", 201);
  });
};

exports.getCharacters = (req, res) => {
  Character.findAll((error, data) => {
    if (error) {
      return error(res, "Error occurred while fetching characters.", 500);
    }
    if (!data || data.length === 0) {
      return success(res, [], "No characters found", 200);
    }
    return success(res, data, "Characters fetched successfully", 200);
  });
};

exports.editCharacter = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return error(res, "Validation error", 400, errors.array());
  }

  if (!req.params.id) {
    return error(res, "Character ID is required", 400);
  }

  let imageUrl = req.body.image; // If no new image uploaded, use the old one
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    // If there's an existing image, delete it from the server (optional)
    if (req.body.image && req.body.image !== imageUrl) {
      const oldImagePath = path.join(__dirname, "../uploads", path.basename(req.body.image));
      fs.unlink(oldImagePath, (err) => {
        if (err) console.log("Error deleting old image", err);
      });
    }
  }

  const updatedCharacter = {
    name: req.body.name,
    image: imageUrl,
    prompt: req.body.prompt,
  };

  Character.update(req.params.id, updatedCharacter, (error, data) => {
    if (error) {
      return error(res, "Error occurred while updating the character.", 500);
    }
    return success(res, data, "Character updated successfully", 200);
  });
};

exports.deleteCharacter = (req, res) => {
  const characterId = req.params.id;
  if (!characterId) {
    return error(res, "Character ID is required", 400);
  }

  Character.findById(characterId, (error, data) => {
    if (error) {
      return error(res, "Error occurred while finding the character.", 500);
    }
    if (!data || data.length === 0) {
      return error(res, "Character not found", 404);
    }

    // If the character has an image, delete it from the server
    const imagePath = path.join(__dirname, "../uploads", path.basename(data[0].image));
    fs.unlink(imagePath, (err) => {
      if (err) console.log("Error deleting image", err);
    });

    Character.delete(characterId, (err, response) => {
      if (err) {
        return error(res, "Error occurred while deleting the character.", 500);
      }
      return success(res, response, "Character deleted successfully", 200);
    });
  });
};
