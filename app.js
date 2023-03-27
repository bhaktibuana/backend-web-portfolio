const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const apiRouter = require("./src");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "./public")));
app.use("/", apiRouter);

app.listen(port, () => {
  console.log("Server is listening on port", port);
});
