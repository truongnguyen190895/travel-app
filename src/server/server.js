const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../../dist")));

app.listen(port, () => {
  console.log("Server is running at port ", port);
});
