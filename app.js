const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");  // To handle file paths
const characterRoutes = require("./routes/character.routes");
const userRoutes = require("./routes/user.routes");
const cors = require('cors')
const app = express();

// Middleware to serve static files from 'uploads' folder
app.use(cors())
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Parse incoming requests as JSON
app.use(bodyParser.json());
// Use routes for character-related API calls
app.use("/api", characterRoutes);
app.use("/",(req,res)=>{
    return(res.status(200).json({message:"working perfectly testing"}))
})
// Use routes for user-related API calls
app.use("/api", userRoutes);


module.exports = app;
