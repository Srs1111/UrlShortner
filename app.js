const express = require("express");

const mongoose = require("mongoose");

const urlRoutes = require("./routes/urlRoutes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/", urlRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
