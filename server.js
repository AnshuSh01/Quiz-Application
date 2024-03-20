const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connectDB");
const userRoutes = require("./routes/userRoutes");
const app = express();
app.use(express.json());
dotenv.config();
connectDB();
app.use("/api/v1/auth", userRoutes);
app.listen(8080, () => {
  console.log("server start");
});
