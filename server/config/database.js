const mongoose = require("mongoose");
require("dotenv").config();
require("colors");

exports.dbConnect = async () => {
  try {
    const uri = process.env.MONGO_URL;
    if (!uri) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }
    await mongoose.connect(uri);
    console.log("MongoDB connection successful".magenta);
  } catch (error) {
    console.log("DB Connection Issues".red);
    console.error(error);
    process.exit(1);
  }
};