const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");

dayjs.extend(utc);

dotenv.config();

const port = process.env.PORT;
const pixabayEnpoint = process.env.PIXABAY_ENDPOINT;
const pixabayKey = process.env.PIXABAY_KEY;
const geoNamesEndpoint = process.env.GEO_NAMES_ENDPONT;
const geoNameKey = process.env.GEO_NAMES_KEY;
const weatherBitEndpoint = process.env.WEATHER_BIT_ENDPOINT;
const weatherKey = process.env.WEATHER_BIT_KEY;

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

app.post("/api/weather", (req, res) => {
  const { destination, departureDate } = req.body;
  const inputDay = dayjs(departureDate, "MM/DD/YYYY");
  const today = dayjs();
  let diff = inputDay.diff(today, "day");

  if (diff > 15) {
    diff = 15;
  }

  fetch(`${geoNamesEndpoint}?q=${destination}&username=${geoNameKey}`)
    .then((response) => response.json())
    .then((data) => {
      const firstResult = data.geonames[0];
      fetch(
        `${weatherBitEndpoint}/forecast/daily?lat=${firstResult.lat}&lon=${
          firstResult.lng
        }&key=${weatherKey}&days=${diff + 1}`
      )
        .then((response) => response.json())
        .then((dataWeather) => res.status(200).json(dataWeather.data[diff]));
    });
});

app.listen(port, () => {
  console.log("Server is running at port ", port);
});
