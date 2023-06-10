const mongoose = require("mongoose");

const DATABASE_CONNECTION = async (URL) => {
  try {
    await mongoose.connect(URL);
    console.log("Database connected successfuly");
  } catch (error) {
    console.log("Database connection failed");
  }
};

module.exports = DATABASE_CONNECTION;
