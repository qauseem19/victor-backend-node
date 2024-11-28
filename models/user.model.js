// CREATE TABLE users (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL UNIQUE,
//     phone VARCHAR(15) NOT NULL,
//     password VARCHAR(255) NOT NULL
//   );
  
const bcrypt = require("bcryptjs");
const db = require("../config/db.config");

class User {
  static create(newUser, result) {
    // Hash the password before storing it
    bcrypt.hash(newUser.password, 10, (err, hashedPassword) => {
      if (err) {
        return result(err, null);
      }

      // Store the hashed password instead of plain text
      newUser.password = hashedPassword;

      const query = "INSERT INTO users SET ?";
      db.query(query, newUser, (error, res) => {
        if (error) {
          result(error, null);
          return;
        }
        result(null, { id: res.insertId, ...newUser });
      });
    });
  }

  static findAll(result) {
    const query = "SELECT id, name, email, phone FROM users"; // Don't select password in this case
    db.query(query, (error, res) => {
      if (error) {
        result(error, null);
        return;
      }
      result(null, res);
    });
  }

  static update(id, updatedUser, result) {
    // If password is provided, hash it before updating
    if (updatedUser.password) {
      bcrypt.hash(updatedUser.password, 10, (err, hashedPassword) => {
        if (err) {
          return result(err, null);
        }

        updatedUser.password = hashedPassword;

        const query = "UPDATE users SET name = ?, email = ?, phone = ?, password = ? WHERE id = ?";
        db.query(query, [updatedUser.name, updatedUser.email, updatedUser.phone, updatedUser.password, id], (error, res) => {
          if (error) {
            result(error, null);
            return;
          }
          if (res.affectedRows === 0) {
            return result({ message: "User not found" }, null);
          }
          result(null, { id, ...updatedUser });
        });
      });
    } else {
      // If no new password, update other fields
      const query = "UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?";
      db.query(query, [updatedUser.name, updatedUser.email, updatedUser.phone, id], (error, res) => {
        if (error) {
          result(error, null);
          return;
        }
        if (res.affectedRows === 0) {
          return result({ message: "User not found" }, null);
        }
        result(null, { id, ...updatedUser });
      });
    }
  }

  static delete(id, result) {
    const query = "DELETE FROM users WHERE id = ?";
    db.query(query, [id], (error, res) => {
      if (error) {
        result(error, null);
        return;
      }
      if (res.affectedRows === 0) {
        return result({ message: "User not found" }, null);
      }
      result(null, { message: "User deleted successfully" });
    });
  }

  static findById(id, result) {
    const query = "SELECT id, name, email, phone FROM users WHERE id = ?";
    db.query(query, [id], (error, res) => {
      if (error) {
        result(error, null);
        return;
      }
      result(null, res);
    });
  }
}

module.exports = User;
