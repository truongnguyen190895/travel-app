import "./styles/style.scss";
import { getDestinationImage } from "./js/app";

const submitBtn = document.querySelector("#submit");
const tripDestination = document.querySelector("#trip-destination"); // should be an input

submitBtn.addEventListener("click", () =>
  getDestinationImage(tripDestination.value)
);
