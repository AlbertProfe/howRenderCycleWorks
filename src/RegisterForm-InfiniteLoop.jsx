import { useState, useEffect } from "react";

const RegisterForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [renderCount, setRenderCount] = useState(0);

  // Increment render count on every render
  useEffect(() => {
    setRenderCount((prevCount) => prevCount + 1);
    console.log(`Render triggered: ${renderCount} times`);
  });

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h2>Register Form Infinite Loop</h2>
      <h4>not using dependency array creates a infinite loop</h4>
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
