import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { ClerkProvider } from "@clerk/clerk-react";

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

console.log(import.meta.env);

ReactDOM.createRoot(document.getElementById("root")).render(
  //<React.StrictMode>
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
  //</React.StrictMode>
);
