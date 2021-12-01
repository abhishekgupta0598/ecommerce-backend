require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const router = require("./router");

const app = express();

app.use(express.json());

mongoose.connect(
  "mongodb://localhost/BagStore",
  () => {
    console.log("connected");
  },
  (e) => console.error(e)
);

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.use("/bagstore", router);

app.listen(8080, () => console.log("listening port 8080"));
