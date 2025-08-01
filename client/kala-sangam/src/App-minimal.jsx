import { useState } from "react";

function MinimalApp() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Minimal App Test</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <p>If you can see this and the button works, React is functioning properly.</p>
    </div>
  );
}

export default MinimalApp;
