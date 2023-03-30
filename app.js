const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const apiRouter = require("./src");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
app.use("/", apiRouter);

module.exports = app;
