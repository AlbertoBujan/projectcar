import React from "react";
import ReactDOM from "react-dom/client";  // <-- Importa de react-dom/client
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));  // <-- Crea el root

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);