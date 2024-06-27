import OceanImage from "@assets/images/ocean.jpg";
import { Button } from "@components/Button";
import "./styles/style.scss";

const App = () => {
  return (
    <div>
      <h1>Hello from React App</h1>
      <div className="image-container">
        <img width="100%" alt="ocean" src={OceanImage} />
        <Button variant="contained">Click me</Button>
      </div>
    </div>
  );
};

export default App;
