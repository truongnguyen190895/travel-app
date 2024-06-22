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
  const maxDaysToForecast = 15;
  if (diff > maxDaysToForecast) {
    diff = maxDaysToForecast;
  }

  fetch(`${geoNamesEndpoint}?q=${destination}&username=${geoNameKey}`)
    .then((response) => {
      if (response.headers.get("Content-Type").includes("application/json")) {
        return response.json();
      } else {
        throw new Error("Invalid response format");
      }
    })
    .then((data) => {
      if (data.geonames.length === 0) {
        throw new Error("No results found for the given destination");
      }
      const firstResult = data.geonames[0];
      return fetch(
        `${weatherBitEndpoint}/forecast/daily?lat=${firstResult.lat}&lon=${
          firstResult.lng
        }&key=${weatherKey}&days=${diff + 1}`
      );
    })
    .then((response) => {
      if (response.headers.get("Content-Type").includes("application/json")) {
        return response.json();
      } else {
        throw new Error("Invalid response format");
      }
    })
    .then((dataWeather) => res.status(200).json(dataWeather.data[diff]))
    .catch((error) => res.status(500).send(error.message));
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log("Server is running at port ", port);
  });
}

module.exports = app;
