# Understanding React's Render Cycle: Trigger, Render, and Commit

React's render cycle is a fundamental concept that every React developer should understand. It consists of three main phases: trigger, render, and commit. Let's explore each phase and see how we can observe them using different hooks like `useRef`, `useEffect`, and `useState`.

![Understanding React's Render Cycle: Trigger, Render, and Commit](https://raw.githubusercontent.com/AlbertProfe/howRenderCycleWorks/refs/heads/main/src/assets/render-cycle.png)

## The Render Cycle

### 1. Trigger Phase

The <mark>trigger phase</mark> is initiated when there's a change in the component's state or props. This can happen due to various reasons:

- The initial render when the component first loads
- A state update using `useState`
- A prop change from a parent component

When any of these occur, React schedules a re-render of the component.[1]

### 2. Render Phase

<mark>During the render phase, React compares the new virtual DOM with the previous one</mark>. It determines what changes need to be made to the actual DOM.

This process is known as **reconciliation**. React doesn't touch the actual DOM during this phase; it just calculates the differences.[5]

### 3. Commit Phase

The <mark>commit phase is where React actually updates the DOM based on the changes identified in the render phase</mark>.

It applies only the necessary changes to the DOM, ensuring efficient updates. It's important to note that React may go through the render phase but not commit if the component returns the same result as the last render.[5]

## Observing the Render Cycle

Let's examine four different scenarios using React hooks to observe how the render cycle behaves:

### Case 1: Using `useRef` to Track Renders

```jsx
import { useState, useRef } from "react";

const RegisterForm = () => {
  const [inputValue, setInputValue] = useState("");
  const renderCount = useRef(0);
  let regularVariable = 150;

  renderCount.current += 1;
  regularVariable += 1;

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h2>Register Form</h2>
      <h4>using useRef to keep values and states btw renders</h4>
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
```

In this case, `useRef` is used to track the number of renders without causing re-renders itself. The `renderCount` persists across renders, while `regularVariable` resets on each render. This allows us to observe how many times the component has rendered without affecting the render cycle.[2]

### Case 2: Infinite Loop with `useEffect`

```jsx
import { useState, useEffect } from "react";

const RegisterFormInfiniteLoop = () => {
  const [inputValue, setInputValue] = useState("");
  const [renderCount, setRenderCount] = useState(0);

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
```

This example demonstrates a common pitfall. Without a dependency array in `useEffect`, it runs after every render. Updating state inside `useEffect` triggers another render, creating an infinite loop. This showcases how improper use of `useEffect` can lead to performance issues.[10]

### Case 3: Single Render with Empty Dependency Array

```jsx
import { useState, useEffect } from "react";

const RegisterFormNoCounter = () => {
  const [inputValue, setInputValue] = useState("");
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount((prevCount) => prevCount + 1);
    console.log(`Render triggered: ${renderCount + 1} times`);
  }, []); // Empty dependency array

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h2>Register Form No Counter</h2>
      <h4>adding an empty dependency array renders just when component loads</h4>
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
```

This case uses an empty dependency array in `useEffect`, causing it to run only once when the component mounts. The render count stays at 1, regardless of input changes. This demonstrates how to perform one-time setup or side effects without affecting subsequent renders.[2]

### Case 4: Render on Input Change

```jsx
import { useState, useEffect } from "react";

const RegisterFormCounterOne = () => {
  const [inputValue, setInputValue] = useState("");
  const [renderCount, setRenderCount] = useState(0);

  useEffect(() => {
    setRenderCount((prevCount) => prevCount + 1);
    console.log(`Render triggered: ${renderCount + 1} times`);
  }, [inputValue]); // Dependency on inputValue

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <h2>Register Form Counter One</h2>
      <h4>adding inputValue dependency array renders sync with inputValue and falses the data</h4>
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
```

This example shows `useEffect` with `inputValue` as a dependency. The effect runs every time `inputValue` changes, updating the render count. This demonstrates how to synchronize side effects with specific state changes, but it can lead to misleading render counts as it doesn't capture all renders.[12]

## Conclusion

Understanding React's render cycle and how different hooks interact with it is crucial for building efficient React applications. By using tools like `useRef`, `useEffect`, and `useState` judiciously, **you will control when and how components update, leading to better performance and user experience**.

Remember:
- Use `useRef` for values that shouldn't trigger re-renders
- Be cautious with `useEffect` dependencies to avoid infinite loops
- Consider the implications of state updates on the render cycle

> Understanding the **whole render cycle and lifecycle stuff** is key. It’ll help you avoid those pesky bugs and performance hiccups; once you’ve got this down, you’ll be rocking your React projects.

Citations:
[1] https://www.fullstackfoundations.com/blog/react-component-lifecycle
[2] https://peterkellner.net/2023/05/05/Understanding-useRef-and-useState-for-Tracking-Component-Render-Count-in-React/
[3] https://stackoverflow.com/questions/60470891/how-do-you-track-the-render-count-of-function-components-in-react-native
[4] https://maybe.works/blogs/react-performance-optimization-techniques
[5] https://dev.to/thee_divide/reconciliation-react-rendering-phases-56g2
[6] https://hygraph.com/blog/react-useref-a-complete-guide
[7] https://usehooks.com/userendercount
[8] https://www.geeksforgeeks.org/optimizing-re-rendering-in-react-best-practices-for-beginners/
[9] https://iampradip.hashnode.dev/understanding-react-render-and-commit-phase-reconciliation
[10] https://believemy.com/en/r/how-to-use-react-useeffect-and-useref-hooks
[11] https://www.dhiwise.com/post/react-profiler-hook-number-enhancing-app-performance
[12] https://hackernoon.com/best-practices-for-react-performance-optimization
[13] https://dev.to/chintanonweb/master-dom-manipulation-and-performance-with-react-useref-hook-1bf1
