const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const uri = process.env.MONGO_URL;
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri);
    console.log("mongoDB connecté avec success");
  } catch (err) {
    console.error("Erreur de connexion à MongoDB:", err.message);
    process.exit(); // Quitter le processus avec un code d'erreur
  }
};
module.exports = connectDB;
