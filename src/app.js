const express = require("express");
const errorHandler = require("./middlewares/errorHandler.js");
const app = express();

const router = require("./routes/index.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

app.use(errorHandler);

module.exports = app;
