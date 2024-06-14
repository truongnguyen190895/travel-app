const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fetch = require("node-fetch");

dotenv.config();

const port = process.env.PORT;
const pixabayEnpoint = process.env.PIXABAY_ENDPOINT;
const pixabayKey = process.env.PIXABAY_KEY;
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../../dist")));

app.get("/api/images", (req, res) => {
  fetch(`${pixabayEnpoint}?key=${pixabayKey}`)
    .then((response) => response.json())
    .then((data) => {
      res.json("Get image successfully ", data);
    });
});

app.listen(port, () => {
  console.log("Server is running at port ", port);
});
