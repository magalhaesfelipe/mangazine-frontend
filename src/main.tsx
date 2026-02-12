import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";

// const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

// if (!CLERK_PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key");
// }

ReactDOM.createRoot(document.getElementById("root")!).render(
  //<React.StrictMode>
  <App />,
  //</React.StrictMode>
);
