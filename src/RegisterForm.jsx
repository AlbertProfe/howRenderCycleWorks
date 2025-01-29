import { useState, useRef } from "react";

const RegisterForm = () => {
  const [inputValue, setInputValue] = useState("");
  const renderCount = useRef(0); // Use useRef to track renders without causing re-renders

  // This variable will be reset on every render
  let regularVariable = 150;

  // Increment render count on every render
  renderCount.current += 1;
  regularVariable += 1;

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h2>Register Form</h2>
      <h4>using useRef to keep values and states btw renders</h4>
      <p className="read-the-docs">Type something</p>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <p>Render Count: {renderCount.current}</p>
      <p>Regular Variable: {regularVariable}</p>
    </div>
  );
};

export default RegisterForm;
