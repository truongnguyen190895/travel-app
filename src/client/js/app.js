import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const today = dayjs();

const tripImageContainer = document.querySelector(".trip-image");
const tempHigh = document.querySelector("#temp_hight");
const tripWeatherContainer = document.querySelector(".trip-weather");
const tempLow = document.querySelector("#temp_low");
const tempDesc = document.querySelector("#tem_desc");
const tripCountdown = document.querySelector(".trip-countdown");

const getDestinationImage = (destination) => {
  fetch("/api/images", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ destination: destination }),
  })
    .then((response) => response.json())
    .then((data) => {
      const imgUrl = data.hits[0].webformatURL;
      const tripImage = document.createElement("img");
      tripImage.src = imgUrl;
      tripImage.alt = "destination image";
      tripImage.style.width = "100%";
      tripImageContainer.innerHTML = "";
      tripImageContainer.appendChild(tripImage);
      tripImageContainer.style.display = "flex";
      tripImageContainer.style.alignItems = "center";
      tripImageContainer.style.justifyContent = "center";
    })
    .catch((error) => console.error("Getting images failed ", error));
};

const getDestinationWeather = (destination, departure) => {
  fetch("/api/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      destination: destination,
      departureDate: departure,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const countdown = dayjs(departure, "MM/DD/YYYY").diff(today, "day");
      tripWeatherContainer.style.display = "flex";
      tempHigh.innerHTML = data.high_temp;
      tempLow.innerHTML = data.low_temp;
      tempDesc.innerHTML = data.weather.description;
      tripCountdown.innerHTML = `The trip is ${countdown} ${
        countdown > 1 ? "days" : "day"
      } away`;
      getDestinationImage(destination);
    });
};

export { getDestinationImage, getDestinationWeather };
