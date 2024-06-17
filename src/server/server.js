const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dayjs = require("dayjs");

dotenv.config();

const port = process.env.PORT;
const pixabayEnpoint = process.env.PIXABAY_ENDPOINT;
const pixabayKey = process.env.PIXABAY_KEY;
const geoNamesEndpoint = process.env.GEO_NAMES_ENDPONT;
const geoNameKey = process.env.GEO_NAMES_KEY;

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../../dist")));

app.post("/api/images", (req, res) => {
  fetch(
    `${pixabayEnpoint}?key=${pixabayKey}&q=${req.body.destination}&image_type=photo&orientation=horizontal`
  )
    .then((response) => response.json())
    .then((data) => {
      res.status(200).json(data);
    });
});

app.post("/api/coordinates", (req, res) => {
  fetch(`${geoNamesEndpoint}?q=${req.body.destination}&username=${geoNameKey}`)
    .then((response) => response.json())
    .then((data) => {
      const firstResult = data.geonames[0];
      res.status(200).json(firstResult);
    });
});

app.listen(port, () => {
  console.log("Server is running at port ", port);
});
