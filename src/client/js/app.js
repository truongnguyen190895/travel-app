const getDestinationImage = (destination) => {
  console.log("getting image for ", destination);
  fetch("/api/images", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log("Image data ", data))
    .catch((error) => console.error("Getting images failed ", error));
};

export { getDestinationImage };
