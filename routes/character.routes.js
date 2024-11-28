// routes/character.routes.js
const express = require("express");
const router = express.Router();
const { addCharacter, getCharacters, editCharacter, deleteCharacter } = require("../controllers/character.controller");
const { characterValidationRules } = require("../validations/character.validation");
const upload = require("../middleware/multerMiddleware.js");

router.post("/character", upload.single("image"), characterValidationRules, addCharacter);
router.get("/getCharacters", getCharacters);
router.put("/character/:id", upload.single("image"), characterValidationRules, editCharacter);
router.delete("/character/:id", deleteCharacter);

module.exports = router;
