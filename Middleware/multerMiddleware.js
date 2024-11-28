// multerMiddleware.js
const multer = require("multer");
const path = require("path");

// Set up the storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define where to store uploaded files
    cb(null, "uploads/");  // Make sure the 'uploads' directory exists
  },
  filename: (req, file, cb) => {
    // Set the filename to be the current timestamp + original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Define file filter to accept only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);  // Accept the file
  } else {
    cb(new Error("Please upload an image file."), false);  // Reject if it's not an image
  }
};

// Create the multer instance
const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
