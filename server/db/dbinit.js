const mongoose = require("mongoose");
require("dotenv").config();
const db = mongoose.connect(process.env.MONGOURI);
mongoose.connection.on("connected", () => {
  console.log("database connected");
});
mongoose.connection.on("error", (e) => {
  console.log("database connection error: ", e);
});
