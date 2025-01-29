import { useState } from "react";
import "./App.css";
import renderCycleImage from "./assets/render-cycle.png";
import RegisterForm from "./RegisterForm";
import RegisterFormInfiniteLoop from "./RegisterForm-InfiniteLoop";
import RegisterFormNoCounter from "./RegisterForm-NoCounter";
import RegisterFormCounterOne from "./RegisterForm-CounterOne";

function App() {
  const [count, setCount] = useState(0);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "RegisterForm":
        return <RegisterForm />;
      case "RegisterFormInfiniteLoop":
        return <RegisterFormInfiniteLoop />;
      case "RegisterFormNoCounter":
        return <RegisterFormNoCounter />;
      case "RegisterFormCounterOne":
        return <RegisterFormCounterOne />;
      case null:
      default:
        return null; // Reset or no component selected
    }
  };

  return (
    <>
      <img
        src={renderCycleImage}
        alt="Render Cycle Diagram"
        style={{
          width: "400px", // Adjust width as needed
          maxWidth: "100%",
          height: "auto",
        }}
      />
      <h1>How Render Cycle Works</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click to learn more about render{" "}
        <a href="https://react.dev/learn/state-as-a-snapshot">cycle</a>
      </p>

      <div>
        <button onClick={() => setSelectedComponent("RegisterForm")}>
          Show RegisterForm
        </button>{" "}
        <button
          onClick={() => setSelectedComponent("RegisterFormInfiniteLoop")}
        >
          Show RegisterFormInfiniteLoop
        </button>{" "}
        <button onClick={() => setSelectedComponent("RegisterFormNoCounter")}>
          Show RegisterFormNoCounter
        </button>{" "}
        <button onClick={() => setSelectedComponent("RegisterFormCounterOne")}>
          Show RegisterFormCounterOne
        </button>
        <br />
        <button onClick={() => setSelectedComponent(null)}>Reset</button>
      </div>

      {renderSelectedComponent()}
    </>
  );
}

export default App;
