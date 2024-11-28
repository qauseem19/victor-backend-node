// models/character.model.js
const db = require("../config/db.config");

class Character {
  static create(newCharacter, result) {
    const query = "INSERT INTO characters SET ?";
    db.query(query, newCharacter, (error, res) => {
      if (error) {
        result(error, null);
        return;
      }
      result(null, { id: res.insertId, ...newCharacter });
    });
  }

  static findAll(result) {
    const query = "SELECT * FROM characters";
    db.query(query, (error, res) => {
      if (error) {
        result(error, null);
        return;
      }
      result(null, res);
    });
  }

  static update(id, updatedCharacter, result) {
    const query = "UPDATE characters SET name = ?, image = ?, prompt = ? WHERE id = ?";
    db.query(query, [updatedCharacter.name, updatedCharacter.image, updatedCharacter.prompt, id], (error, res) => {
      if (error) {
        result(error, null);
        return;
      }
      if (res.affectedRows === 0) {
        return result({ message: "Character not found" }, null);
      }
      result(null, { id, ...updatedCharacter });
    });
  }

  static delete(id, result) {
    const query = "DELETE FROM characters WHERE id = ?";
    db.query(query, [id], (error, res) => {
      if (error) {
        result(error, null);
        return;
      }
      if (res.affectedRows === 0) {
        return result({ message: "Character not found" }, null);
      }
      result(null, { message: "Character deleted successfully" });
    });
  }

  static findById(id, result) {
    const query = "SELECT * FROM characters WHERE id = ?";
    db.query(query, [id], (error, res) => {
      if (error) {
        result(error, null);
        return;
      }
      result(null, res);
    });
  }
}

module.exports = Character;
