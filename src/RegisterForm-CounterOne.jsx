import { useState, useEffect } from "react";

const RegisterForm = () => {
  const [inputValue, setInputValue] = useState("");
  const [renderCount, setRenderCount] = useState(0);

  // Increment render count only once
  useEffect(() => {
    setRenderCount((prevCount) => prevCount + 1);
    console.log(`Render triggered: ${renderCount + 1} times`);
  }, [inputValue]); // Add an inputValue dependency array

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h2>Register Form Counter One</h2>
      <h4>
        adding inputValue dependency array renders sync with inputValue and
        falses the data
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
