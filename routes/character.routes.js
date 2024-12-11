// routes/character.routes.js
const express = require("express");
const router = express.Router();
const { addCharacter, getCharacters, editCharacter, deleteCharacter, getCharacterById } = require("../controllers/character.controller");
const { characterValidationRules } = require("../validations/character.validation");
const upload = require("../Middleware/multerMiddleware.js");

router.post("/character", upload.single("image"), characterValidationRules, addCharacter);
router.get("/getCharacters", getCharacters);
router.put("/character/:id", upload.single("image"), characterValidationRules, editCharacter);
router.delete("/character/:id", deleteCharacter);
router.post("/characterById", getCharacterById);


module.exports = router;
