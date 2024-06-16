const tripImageContainer = document.querySelector(".trip-image");

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
      tripImageContainer.appendChild(tripImage);
      tripImageContainer.style.display = "flex";
      tripImageContainer.style.alignItems = "center";
      tripImageContainer.style.justifyContent = "center";
    })
    .catch((error) => console.error("Getting images failed ", error));
};

export { getDestinationImage };
