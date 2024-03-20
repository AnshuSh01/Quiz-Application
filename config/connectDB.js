const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connect DB");
  } catch (error) {
    console.log("not connect DB");
  }
};

module.exports = connectDB;
