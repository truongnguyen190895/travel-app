import { getDestinationWeather } from "./js/app";
import "./styles/style.scss";

const submitBtn = document.querySelector("#submit");
const tripDestination = document.querySelector("#trip-destination"); // should be an input
const tripDeparture = document.querySelector("#trip-departure"); // should be an input

submitBtn.addEventListener("click", () => {
  const destination = tripDestination.value;
  const departure = tripDeparture.value;
  if (destination && departure) {
    getDestinationWeather(encodeURIComponent(destination), departure);
  } else {
    window.alert("Location and departure can not be empty");
  }
});
