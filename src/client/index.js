import "./styles/style.scss";
import { getDestinationImage, getDestinationCoordinates } from "./js/app";

const submitBtn = document.querySelector("#submit");
const tripDestination = document.querySelector("#trip-destination"); // should be an input

submitBtn.addEventListener("click", () =>
  getDestinationCoordinates(encodeURIComponent(tripDestination.value)).then(
    () => getDestinationImage(encodeURIComponent(tripDestination.value))
  )
);
