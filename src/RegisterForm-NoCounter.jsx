import { useState, useEffect } from "react";

const RegisterForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [renderCount, setRenderCount] = useState(0);

  // Increment render count only once
  useEffect(() => {
    setRenderCount((prevCount) => prevCount + 1);
    console.log(`Render triggered: ${renderCount + 1} times`);
  }, []); // Add an empty dependency array

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h2>Register Form No Counter</h2>
      <h4>
        adding an empty dependency array renders just when component loads
      </h4>
      <p className="read-the-docs">Type something</p>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <p>Render Count: {renderCount}</p>
    </div>
  );
};

export default RegisterForm;
