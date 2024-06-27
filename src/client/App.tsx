import React from "react";
import OceanImage from "./assets/images/ocean.jpg";
import "./styles/style.scss";

const App = () => {
  const string = "my string";
  console.log(string);
  return (
    <div>
      <h1>Hello from React App</h1>
      <div className="image-container">
        <img width="100%" alt="ocean" src={OceanImage} />
      </div>
    </div>
  );
};

export default App;
