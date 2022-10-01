const express = require("express");
const app = express();
const cors = require("cors");

const router = require("./routes/index.js");
const errHandler = require("./middlewares/error.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(router);
app.use(errHandler);

module.exports = app;
